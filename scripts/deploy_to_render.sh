#!/usr/bin/env bash
set -euo pipefail
echo "Preparing Render deployment for hrms-backend..."

if [ ! -f render.yaml ]; then
  echo "render.yaml not found in repo root. Aborting." >&2
  exit 1
fi

echo "Installing Python deps into temporary venv..."
python -m venv .venv || true
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt

echo "Running migrations and collecting static files (local)..."
cd backend
python manage.py migrate --noinput
python manage.py collectstatic --noinput
cd ..

echo "Staging Render config and Procfile..."
git add render.yaml backend/Procfile
git commit -m "Add Render deploy config" || echo "No changes to commit"

echo "Pushing to 'origin' branch 'main' (change if needed)..."
git push origin main

echo "Done. Now connect your Git repo to Render (if not already) or use the Render dashboard to create the service from render.yaml."
