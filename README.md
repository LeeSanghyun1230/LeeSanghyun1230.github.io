# Pixel Studio · Sanghyun Lee

Vite와 Three.js로 만든 반응형 3D 픽셀 포트폴리오입니다. HOME의 작업실에서 커서나 터치 위치를 따라 캐릭터의 머리와 몸이 움직입니다. ABOUT, SKILLS, PROJECTS, CONTACT에서 소개와 구현 내용을 볼 수 있습니다.

## 로컬 실행

Node.js 22 환경에서 이 파일이 있는 폴더를 엽니다.

```sh
npm ci
npm run dev
```

배포 빌드와 미리보기는 다음 명령으로 실행합니다.

```sh
npm run build
npm run preview
```

## GitHub Pages

대상 저장소는 `LeeSanghyun1230/LeeSanghyun1230.github.io`입니다. 이 폴더의 package.json과 .github 디렉터리가 저장소 루트에 위치해야 합니다. Settings → Pages에서 소스로 GitHub Actions를 선택하세요. master에 푸시하거나 Actions에서 워크플로를 수동 실행하면 의존성을 설치하고 dist를 빌드해 게시합니다. 사용자 사이트의 기본 경로는 /입니다.

배포 주소는 [LeeSanghyun1230.github.io](https://LeeSanghyun1230.github.io/)입니다.

## 프로필 README

[profile/README.md](profile/README.md)는 별도 공개 프로필 저장소 `LeeSanghyun1230/LeeSanghyun1230`의 루트에 사용할 파일입니다.

