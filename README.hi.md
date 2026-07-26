<p align="center">
  <img src="assets/brand/readme-flow.svg" width="960" alt="Dwi कार्यप्रवाह: छह मॉड्यूलर रास्ते मानव-केंद्रित परत से होकर नियंत्रित कार्रवाई में मिलते हैं">
</p>

<h1 align="center">AI एजेंटों के लिए मानव-केंद्रित परत</h1>

<p align="center">अत्यधिक योजना, टोकन की बर्बादी, संदर्भ खोने और स्पष्ट अनुमति के बिना की गई कार्रवाइयों को कम करने वाली एक मॉड्यूलर मानव परत।</p>

<p align="center"><strong>Research Preview 0.2.0</strong> · नवीनतम reviewed repository release: v0.2.4 · 6 focused modules + 1 optional All-in-One</p>

<p align="center"><a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.fr.md">Français</a></p>

> **लाइसेंस:** कोड और इंस्टॉल किए जा सकने वाले मॉड्यूल Apache-2.0 के अंतर्गत हैं। दस्तावेज़ और मूल repository assets CC BY 4.0 के अंतर्गत हैं। ब्रांड उपयोग के लिए [TRADEMARKS.md](TRADEMARKS.md) देखें।

## Dwi क्या करता है

AI coding tools पहले से tool access नियंत्रित करते हैं। Dwi उस कार्य के आसपास अक्सर अनकहे रह जाने वाले मानवीय नियंत्रण स्पष्ट करता है: उपयोगकर्ता की मंशा, बदलाव की सीमा, पर्याप्त प्रयास, लिखने का अधिकार और परिणाम के समर्थन में प्रमाण।

Dwi कोई नया runtime, daemon या MCP server नहीं है। प्रत्येक मॉड्यूल को स्वतंत्र रूप से पढ़ा, इंस्टॉल और हटाया जा सकता है।

## अपनी समस्या से शुरू करें

| स्थिति | सुझाया मॉड्यूल | मुख्य बदलाव |
| --- | --- | --- |
| एजेंट के प्रश्न लंबे या कठिन हैं | Dwi • Conduct | शब्दों को स्पष्ट करता है और सुरक्षित default देता है |
| छोटा काम बहुत बड़ी योजना बन जाता है | Dwi • Lean | पर्याप्त न्यूनतम रास्ता चुनता है |
| token या समय का उपयोग अस्पष्ट है | Dwi • Budget | resource boundaries तय करता है और केवल observed use बताता है |
| Claude और Codex को साथ काम करना है | Dwi • Bridge | सलाह, अधिकार, प्रभाव और प्रमाण अलग करता है |
| कई एजेंटों को साझा संरचना चाहिए | Dwi • Arc | सीमित work cells और हर scope के लिए एक writer तय करता है |
| परिणाम निश्चित लगता है पर प्रमाण स्पष्ट नहीं | Dwi • Evidence | verified, observed, estimated, target और unknown अलग करता है |
| कई समस्याएँ साथ-साथ दोहराती हैं | Dwi • All-in-One | केवल संबंधित Dwi lenses को जोड़ता है |

## सुरक्षित परीक्षण

1. केवल एक मॉड्यूल चुनें।
2. इंस्टॉल करने से पहले उसका `SKILL.md` और अंग्रेज़ी मॉड्यूल गाइड पढ़ें।
3. पहले project scope में, reversible task पर परीक्षण करें जिसमें secrets या external side effects न हों।
4. मॉड्यूल को स्पष्ट रूप से invoke करें और सामान्य workflow से तुलना करें।
5. उपयोगी न लगे तो मॉड्यूल folder हटा दें।

पूर्ण installation commands, safety guidance, architecture और evidence policy के लिए फिलहाल [English README](README.md) या [Vietnamese README](README.vi.md) को authoritative reference मानें। Commands, paths, hashes और module names का अनुवाद न करें।

## स्थिति

- Module-content Research Preview baseline: `0.2.0`
- नवीनतम reviewed repository release: `v0.2.4`
- `v0.2.3`: Codex और Claude Code के explicit-only installation contract को ठीक करता है
- `v0.2.4`: Codex policy validation और merge commits में release detection को मजबूत करता है
- मौजूदा `v0.2.2` tag: patch से पहले के commit की non-release reference; corrected installation के लिए उपयोग न करें
- Canonical module bodies और SHA-256: `v0.2.0` से अपरिवर्तित
- Installable content: 6 focused modules + optional All-in-One
- सटीक installation commands के लिए English या Vietnamese documentation का उपयोग करें

संपर्क: [hoc@wi.works](mailto:hoc@wi.works)
