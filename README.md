# 이상현 포트폴리오

자기소개, 기술, 프로젝트, 활동 기록을 한 페이지에 정리했습니다.

- `index.html`에 본문과 사진, 링크가 있습니다. 상단 메뉴의 `href="#skills"`처럼 링크 주소와 섹션의 `id`를 맞춰 페이지 안에서 이동합니다.
- `src/style.css`에서 색상, 간격, 사진 배치를 정합니다. 작은 화면에서는 미디어 쿼리로 열 수를 줄입니다.
- `src/main.js`는 스크롤 위치를 확인해 현재 메뉴에 밑줄을 표시합니다.

## 실행과 배포

`npm ci` 후 `npm run dev`로 실행합니다. `npm run build`를 실행하면 Vite가 배포 파일을 `dist`에 모읍니다. GitHub Actions는 master 브랜치가 업데이트될 때 이 폴더를 GitHub Pages에 게시합니다.
