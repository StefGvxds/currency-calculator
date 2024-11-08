import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 120, borderColor: 'white' }}
        >
            <InputLabel
                id="language-select-label"
                sx={{ color: 'white' }}
            >
                {t('language')}
            </InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={i18n.language || 'en'}
                onChange={changeLanguage}
                label="Language"
                sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white',
                    },
                    width: '70px'
                }}
            >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="de">DE</MenuItem>
                <MenuItem value="el">EL</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSwitcher;
