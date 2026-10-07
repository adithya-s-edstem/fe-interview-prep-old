#!/usr/bin/env bash
set -euo pipefail

readonly MAX_LINE_LENGTH="${MAX_LINE_LENGTH:-120}"
readonly MAX_FILE_LINES="${MAX_FILE_LINES:-400}"
readonly IGNORE_FILE=".limitsignore"

ignore_patterns=("*.md" "*.lock" "*-lock.json" "*-lock.yaml" "go.sum" "*.min.js" "*.min.css" "*.svg" "*.snap")

load_ignore_file() {
  [[ -f "$IGNORE_FILE" ]] || return 0
  local pattern
  while IFS= read -r pattern || [[ -n "$pattern" ]]; do
    if [[ -n "$pattern" ]]; then
      ignore_patterns+=("$pattern")
    fi
  done < "$IGNORE_FILE"
}

list_candidate_files() {
  if [[ "${1:-}" == "--all" ]]; then
    git ls-files
    return
  fi
  local base_ref="${1:-origin/main}"
  git diff --name-only --diff-filter=ACMR "$(git merge-base "$base_ref" HEAD)"
  git ls-files --others --exclude-standard
}

is_ignored() {
  local path="$1" pattern
  for pattern in "${ignore_patterns[@]}"; do
    [[ "$path" == $pattern || "${path##*/}" == $pattern ]] && return 0
  done
  return 1
}

is_checkable() {
  local path="$1"
  [[ -f "$path" && ! -L "$path" ]] && ! is_ignored "$path" && grep -Iq . "$path"
}

report_violations() {
  awk -v max_length="$MAX_LINE_LENGTH" -v max_lines="$MAX_FILE_LINES" '
    { sub(/\r$/, "") }
    length($0) > max_length {
      printf "%s:%d: line is %d characters, limit is %d\n", FILENAME, FNR, length($0), max_length
    }
    END {
      if (NR > max_lines) printf "%s: file is %d lines, limit is %d\n", FILENAME, NR, max_lines
    }
  ' "$1"
}

main() {
  load_ignore_file
  local violations="" path
  while IFS= read -r path; do
    if is_checkable "$path"; then
      violations+="$(report_violations "$path")"$'\n'
    fi
  done < <(list_candidate_files "${1:-}" | sort -u)

  violations="$(printf '%s' "$violations" | sed '/^$/d')"
  if [[ -n "$violations" ]]; then
    printf '%s\n' "$violations"
    exit 1
  fi
  echo "check-limits: all files within ${MAX_LINE_LENGTH} characters per line and ${MAX_FILE_LINES} lines per file"
}

main "$@"
