@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Publicando DopShop no GitHub Pages ===
echo Repo: https://github.com/MarceloFigueiredo23/DOPAMINA
echo URL:  https://marcelofigueiredo23.github.io/DOPAMINA/
echo.

if not exist ".pages-repo\.git" (
  echo Clonando repositorio...
  git clone https://github.com/MarceloFigueiredo23/DOPAMINA.git .pages-repo
  if errorlevel 1 goto :err
)

echo Copiando arquivos...
for %%D in (css js) do if not exist ".pages-repo\%%D" mkdir ".pages-repo\%%D"

copy /Y "index.html" ".pages-repo\" >nul
copy /Y "css\*.css" ".pages-repo\css\" >nul
copy /Y "js\*.js" ".pages-repo\js\" >nul

cd .pages-repo
git add -A
git status
echo.
git -c user.name="Marcelo Figueiredo" -c user.email="marcelofigueiredo23@users.noreply.github.com" commit -m "Deploy: app completo (header fixo, logos, brands)"
if errorlevel 1 (
  echo Nada novo para publicar ou commit falhou.
  goto :end
)

echo.
echo Enviando para GitHub...
git push origin main
if errorlevel 1 goto :err

echo.
echo Publicado! Aguarde ~1 min e abra com Ctrl+F5:
echo https://marcelofigueiredo23.github.io/DOPAMINA/
goto :end

:err
echo.
echo ERRO no push. Verifique login git e tente de novo.
:end
pause
