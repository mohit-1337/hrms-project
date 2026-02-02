Write-Host "Preparing Render deployment for hrms-backend..."

if (-not (Test-Path -Path "render.yaml")) {
    Write-Error "render.yaml not found in repo root. Aborting."
    exit 1
}

Write-Host "Installing Python deps into virtual environment..."
python -m venv .venv
& .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt

Write-Host "Running migrations and collectstatic (local)..."
Push-Location backend
python manage.py migrate --noinput
python manage.py collectstatic --noinput
Pop-Location

Write-Host "Staging Render config and Procfile..."
git add render.yaml backend/Procfile
git commit -m "Add Render deploy config" -ErrorAction SilentlyContinue

Write-Host "Pushing to 'origin' branch 'main' (change if needed)..."
git push origin main

Write-Host "Done. Connect the repository to Render or create service from render.yaml in Render dashboard."
