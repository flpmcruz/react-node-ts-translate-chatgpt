import { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from './constants'
import { ArrowIcon, CopyIcon, SpeakerIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionTypes } from './types.d'
import { TextArea } from './components/TextArea'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const { loading, fromLanguage, toLanguage, setFromLanguage, fromText, result, interchangeLanguage, setToLanguage, setFromText, setResult } = useStore()

  const debouncedFromText = useDebounce<string>(fromText, 500)

  useEffect(() => {
    if (debouncedFromText === '') return

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromLanguage,
        toLanguage,
        text: fromText
      })
    }).then(res => res.json())
      .then(data =>
        setResult(data.result)
      ).catch(() => setResult('Error'))

  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_LANGUAGES[toLanguage]
    utterance.rate = 0.8
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionTypes.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              value={fromText}
              loading={loading}
              type={SectionTypes.From}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant="link"
            onClick={interchangeLanguage}
            disabled={fromLanguage === AUTO_LANGUAGE}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionTypes.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                value={result}
                loading={loading}
                type={SectionTypes.To}
                onChange={setResult}
              />
              <div style={{ display: 'flex', position: 'absolute', left: 0, bottom: 0 }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <CopyIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container >
  )
}

export default App
