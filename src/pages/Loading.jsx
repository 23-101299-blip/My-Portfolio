import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import { LoadingPanel } from '../components/Preloader';

// The preloader as its own page (it also plays automatically on a visitor's first visit).
export default function Loading() {
  const navigate = useNavigate();
  const [run, setRun] = useState(0);
  return (
    <Page title="Loading">
      <section className="band band--split" style={{ '--split': '18%' }}>
        <div className="container">
          <h1 className="section-title">▶ PLAYER ONE / STARTUP</h1>
          <LoadingPanel key={run} onDone={() => navigate('/')} doneLabel="ENTER HOME →" />
          <div className="center mt-32">
            <button type="button" className="text-link as-button" onClick={() => setRun((r) => r + 1)}>↻ Replay loading animation</button>
          </div>
        </div>
      </section>
    </Page>
  );
}
