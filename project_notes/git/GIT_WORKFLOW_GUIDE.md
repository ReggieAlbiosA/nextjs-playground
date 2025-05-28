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
4. Working with commits and branches
5. Connecting to GitHub (remote repository)
6. Pushing, pulling, and syncing updates
7. Understanding repository types

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

## 🔀 Step 4: Work with Commits and Branches

```bash
# Switch to previous commit (detached HEAD)
git checkout <commit_hash>

# Return to current branch
git checkout main

# Force switch and discard changes
git checkout -f main
```

---

## 🌐 Step 5: Create and Connect to GitHub Repository

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

## 🔄 Step 6: Syncing Changes

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

## 🗂 Repository Types Overview

| Local Repository           | Remote Repository (GitHub)          |
| -------------------------- | ----------------------------------- |
| On your machine            | On GitHub cloud                     |
| Private (by default)       | Shareable with collaborators        |
| Use `git` commands locally | Use `git push` / `git pull` to sync |

---

✅ **Save this markdown as `github-workflow-guide.md` for your documentation or team onboarding!**
