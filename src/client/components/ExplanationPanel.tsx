export default function ExplanationPanel() {
  const keyGuideList = [
    ["← or  h", "左移動"],
    ["→ or  l", "右移動"],
    ["↑ or  k", "回転"],
    ["↓ or  j", "下移動"],
    ["Space", "下まで落下"],
  ].map(([key, text], i) => (
    <div key={i} className="keyguide-block">
      <div className="keyguide-key">{key}</div>
      <div className="keyguide-text">{text}</div>
    </div>
  ));
  return (
    <aside className="ExplanationPanel">
      <div className="ExplanationPanel-wrapper">
        <div className="subtitle">キー操作</div>
        <div className="keyguide">{keyGuideList}</div>
      </div>
    </aside>
  );
}
