import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionTypes } from './types.d'
import { TextArea } from './components/TextArea'

function App() {
  const { loading, fromLanguage, toLanguage, setFromLanguage, fromText, result, interchangeLanguage, setToLanguage, setFromText, setResult } = useStore()

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
            <TextArea
              value={result}
              loading={loading}
              type={SectionTypes.To}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
