import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from "../constants";
import { FC } from "react";
import { FromLanguage, Language, SectionTypes } from "../types.d";

type Props =
    | { type: SectionTypes.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionTypes.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, value, type }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language);
    }
    return (
        <Form.Select
            aria-label="Select language"
            onChange={handleChange}
            value={value}
        >
            {type === SectionTypes.From && <option value={AUTO_LANGUAGE}>Detect language</option>}

            {Object.entries(SUPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={literal}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
};