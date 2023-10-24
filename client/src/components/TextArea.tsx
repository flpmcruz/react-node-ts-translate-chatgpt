import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { SectionTypes } from '../types.d';

type Props =
    {
        loading: boolean;
        onChange: (value: string) => void;
        value: string;
        type: SectionTypes;
    }

const commonStyles = { height: '200px', border: 0 }

const getPlaceHolder = ({ type, loading }: { type: SectionTypes, loading: boolean }) => {
    if (type === SectionTypes.From) return 'Enter text'
    if (loading === true) return 'Translating...'
    if (type === SectionTypes.To) return 'Translation'
    return 'Translation'
}

export const TextArea: FC<Props> = ({ loading, type, value, onChange }) => {

    const styles = type === SectionTypes.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#f1f3f4' }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)

    return (
        <Form.Control
            as="textarea"
            placeholder={getPlaceHolder({ type, loading })}
            autoFocus={type === SectionTypes.From ? true : false}
            rows={5}
            className="mt-2"
            disabled={type === SectionTypes.To}
            value={value}
            onChange={handleChange}
            style={styles}
        />
    )
}