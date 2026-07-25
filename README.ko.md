<p align="center">
  <img src="assets/brand/readme-flow.svg" width="960" alt="Dwi 워크플로: 여섯 개의 모듈 경로가 인간 중심 레이어를 거쳐 통제된 행동으로 합쳐짐">
</p>

<h1 align="center">AI 에이전트를 위한 인간 중심 레이어</h1>

<p align="center">과도한 계획, 토큰 낭비, 컨텍스트 손실, 명확한 권한 없이 수행되는 행동을 줄이기 위한 모듈식 레이어입니다.</p>

<p align="center"><strong>Research Preview 0.2.0</strong> · 최신 검토 완료 저장소 릴리스: v0.2.2 · 6개 집중 모듈 + 선택형 All-in-One</p>

<p align="center"><a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.fr.md">Français</a> · <a href="README.hi.md">हिन्दी</a></p>

> **라이선스:** 코드와 설치형 모듈은 Apache-2.0, 문서와 원본 저장소 자산은 CC BY 4.0을 따릅니다. 브랜드 사용은 [TRADEMARKS.md](TRADEMARKS.md)를 확인하세요.

## Dwi가 하는 일

AI 코딩 도구는 도구 접근 권한을 통제합니다. Dwi는 그 주변에서 자주 암묵적으로 남는 인간의 의도, 변경 범위, 적정 작업량, 쓰기 권한, 증거 기준을 명시적이고 검토 가능한 형태로 만듭니다.

Dwi는 별도의 런타임, 데몬, MCP 서버가 아닙니다. 각 모듈은 독립적으로 읽고, 설치하고, 제거할 수 있습니다.

## 현재 문제에 맞춰 선택하기

| 상황 | 시작 모듈 | 핵심 변화 |
| --- | --- | --- |
| 질문이 길고 답하기 어렵다 | Dwi • Conduct | 용어를 설명하고 안전한 기본값을 제시 |
| 작은 작업이 큰 계획으로 번진다 | Dwi • Lean | 충분한 최소 경로를 선택하고 정해진 지점에서 중단 |
| 토큰과 시간 사용이 불명확하다 | Dwi • Budget | 자원 경계를 정하고 관찰된 사용량만 보고 |
| Claude와 Codex가 협업해야 한다 | Dwi • Bridge | 조언, 권한, 영향, 증거를 분리 |
| 여러 에이전트에 구조가 필요하다 | Dwi • Arc | 작업 범위를 제한하고 범위별 작성자를 한 명으로 지정 |
| 결과의 근거가 불분명하다 | Dwi • Evidence | 검증, 관찰, 추정, 목표, 미확인을 구분 |
| 여러 문제가 반복해서 함께 나타난다 | Dwi • All-in-One | 관련된 Dwi 렌즈만 선택적으로 결합 |

## 안전하게 시험하기

1. 모듈 하나만 선택합니다.
2. 설치 전에 해당 `SKILL.md`와 영어 모듈 가이드를 읽습니다.
3. 비밀 정보와 외부 부작용이 없는 되돌릴 수 있는 작업에 프로젝트 범위로 설치합니다.
4. 모듈을 명시적으로 호출하고 평소 결과와 비교합니다.
5. 도움이 되지 않으면 모듈 폴더를 제거합니다.

전체 설치 명령, 안전 정책, 아키텍처, 증거 정책은 현재 [영어 README](README.md) 또는 [베트남어 README](README.vi.md)를 기준으로 사용하세요. 명령어, 경로, 해시, 모듈 이름은 번역하지 마세요.

## 상태

- 모듈 콘텐츠 Research Preview 기준선: `0.2.0`
- 최신 검토 완료 저장소 릴리스: `v0.2.2`
- 이번 패치: Codex와 Claude Code의 명시적 호출 전용 설치 계약 수정
- 표준 모듈 본문과 SHA-256: `v0.2.0`에서 변경 없음
- 설치형 구성: 6개 집중 모듈 + 선택형 All-in-One
- 정확한 설치 명령은 영어 또는 베트남어 문서를 기준으로 사용

문의: [hoc@wi.works](mailto:hoc@wi.works)
