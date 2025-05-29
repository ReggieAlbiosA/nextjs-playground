# 📘 GitHub Workflow Guide

---

## 🎯 Goals

- Provide a clear step-by-step Git + GitHub setup guide
- Help manage local and remote repositories efficiently
- Clarify key Git commands for solo or team development
- Serve as a personal reference or team onboarding doc

---

## 🏷 Topics Covered

1. Git global configuration
2. Local repository setup
3. Tracking, committing, and managing changes
4. Branching strategies and management (creating, switching, listing, deleting branches)
5. Working with commits (viewing history, amending, reverting, resetting)
6. Connecting to GitHub (remote repository)
7. Pushing, pulling, and syncing updates
8. Merging and Rebasing (strategies, conflict resolution, interactive rebase)
9. Stashing changes
10. Collaboration with Pull Requests (GitHub workflow)
11. Understanding repository types

---

## ⚙️ Step 1: Configure Git (Global Settings)

```bash
# Set your GitHub user info
git config --global user.name "yourgitaccountname"
git config --global user.email "yourgitaccountemail"

# (Optional) Set default branch name (instead of 'main')
git config --global init.defaultBranch dev
```

---

## 📦 Step 2: Initialize Local Repository

```bash
# Initialize Git repository in project folder
git init

# Check branch and file status
git status
```

---

## ✏️ Step 3: Track and Commit Changes

```bash
# Track all changes
git add .

# Or track a specific file/folder
git add folder/file

# Commit changes
git commit -m "Your commit message"

# View commit history
git log
```

---

## 🔀 Step 4: Branching Strategies and Management

Branches are essential for isolating development work, fixing bugs, or experimenting without affecting the main codebase (e.g., `main` or `dev` branch).

### Creating and Switching Branches

```bash
# List all local branches (current branch is marked with *)
git branch

# List all remote branches
git branch -r

# List all local and remote branches
git branch -a

# Create a new branch based on your current branch
git branch <new-branch-name>

# Switch to an existing branch
git checkout <existing-branch-name>
# This updates your working directory to reflect the state of that branch.

# Create a new branch AND switch to it immediately
git checkout -b <new-branch-name>
# Equivalent to:
# git branch <new-branch-name>
# git checkout <new-branch-name>

# Create a new branch from a specific existing branch and switch to it
git checkout -b <new-branch-name> <existing-branch-name>

# Create a new branch pointing to a specific commit
git branch <new-branch-name> <commit_hash>

# Switch back to the default branch (e.g., 'main')
git checkout main

# Force switch to a branch and discard local changes (Use with caution!)
git checkout -f main
```

### Deleting Branches

```bash
# Delete a local branch (only if it's fully merged into HEAD)
git branch -d <branch-name>

# Force delete a local branch (even if not merged - potential data loss!)
git branch -D <branch-name>

# Delete a remote branch
git push origin --delete <branch-name>
# Or: git push origin :<branch-name> (older syntax)
```

### Renaming Branches

```bash
# Rename the current local branch
git branch -m <new-branch-name>

# Rename a different local branch
git branch -m <old-branch-name> <new-branch-name>

# To "rename" a remote branch, you typically:
# 1. Rename the local branch.
# 2. Push the new local branch to the remote.
# 3. Delete the old remote branch.
# git push origin -u <new-branch-name>
# git push origin --delete <old-branch-name>
```

---

## 🧐 Step 5: Working with Commits (Advanced)

Beyond just creating commits, Git offers powerful ways to manage and modify them.

### Viewing Commit History

```bash
# View commit history (shows hash, author, date, message)
git log

# View history with more detail (patches introduced)
git log -p

# View history in a compact, one-line format with graph
git log --oneline --graph --decorate --all

# View history for a specific file
git log <file-path>

# View history since a specific date
git log --since="2 weeks ago"

# Switch to a previous commit (Detached HEAD state - for inspection)
git checkout <commit_hash>
# To go back to your branch: git checkout <branch-name>
```

### Amending the Last Commit

If you made a mistake in your last commit message or forgot to add a file:

```bash
# Add any missed files
git add <missed-file>

# Amend the previous commit (opens editor for message change)
git commit --amend

# Amend with a new message directly
git commit --amend -m "New corrected commit message"
# Caution: Only amend commits that haven't been pushed to a shared remote.
# If pushed, it rewrites history and can cause issues for collaborators.
```

### Reverting Commits

To undo a commit by creating a new commit that reverses its changes:

```bash
# Revert a specific commit (creates a new commit undoing the changes)
git revert <commit_hash>
# This is safe for shared history as it doesn't rewrite it.
# Git will open an editor for the revert commit message.
```

### Resetting Commits (Use with Caution)

`git reset` moves the current branch tip, potentially discarding commits or changes.
**Be very careful with `git reset`, especially `--hard`, as it can lead to data loss.**

```bash
# Unstage a file (remove from staging area, keep changes in working directory)
git reset HEAD <file-name>

# Reset to a previous commit, keeping changes in working directory (unstaged)
# This is the default mode (mixed).
git reset <commit_hash>
# Or: git reset --mixed <commit_hash>

# Reset to a previous commit, keeping changes staged
git reset --soft <commit_hash>
# Useful for squashing commits or redoing commit structure.

# Reset to a previous commit, discarding all changes since (DANGEROUS)
git reset --hard <commit_hash>
# This will delete uncommitted changes and commits after <commit_hash> on this branch.
# Use only on local commits that haven't been pushed, or if you're sure.
```

---

## 🌐 Step 6: Create and Connect to GitHub Repository

1️⃣ **On GitHub:**

- Log in → Click ➕ → New repository
- Name: nextjs-playground (or your choice)
- Visibility: Public or Private
- ⚠ Do NOT initialize with README
- Click **Create repository**

2️⃣ **In terminal:**

```bash
# Add remote repository (choose one)

# HTTPS
git remote add origin https://github.com/yourusername/nextjs-playground.git

# SSH
git remote add origin git@github.com:yourusername/nextjs-playground.git

# Rename branch if needed
git branch -M main

# Push local commits to GitHub
git push -u origin main
```

---

## 🔄 Step 7: Syncing Changes

```bash
# Pull latest updates
git pull origin main

# Push new commits
git push
```

---

## Working on Branching

```bash


# Switching to a specific branch (existing or new)
git checkout <existing-or-new-branch>
# If the branch exists, this switches your working directory to it.
# If the branch does not exist, this command will fail (unless you use -b to create).

# Going to the default branch (usually 'main' or 'master')
git checkout main
# Switches your working directory back to the default branch named 'main'.
# Replace 'main' with your default branch name if different (e.g., 'master').

# Creating a new branch and switching to it immediately
git checkout -b <new-branch>
# Creates a new branch called <new-branch> based on your current branch,
# and switches your working directory to this new branch.

# Creating a new branch pointing to a specific existing branch (without switching)
git branch <new-branch-name> <existing-branch-name>
# Creates a new branch called <new-branch-name> that points to the same commit as <existing-branch-name>.
# Your working directory remains on the current branch (no switch occurs).

# Creating a new branch from a specific existing branch and switching to it immediately
git checkout -b <new-branch-name> <existing-branch-name>
# Creates a new branch called <new-branch-name> starting from <existing-branch-name>,
# then switches your working directory to this new branch.


```

##

## 🗂 Repository Types Overview

| Local Repository           | Remote Repository (GitHub)          |
| -------------------------- | ----------------------------------- |
| On your machine            | On GitHub cloud                     |
| Private (by default)       | Shareable with collaborators        |
| Use `git` commands locally | Use `git push` / `git pull` to sync |

---

✅ **Save this markdown as `github-workflow-guide.md` for your documentation or team onboarding!**
