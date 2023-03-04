import React, {useRef, useState} from 'react';
import {Box, Button, Grid, TextField} from '@mui/material';
import {useAppSelector} from "../../../app/hook";
import {selectProductError} from "../../../features/product/productsSlice";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
    const error = useAppSelector(selectProductError);
    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }
        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Box sx={{width: '300px'}}>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item sm={9}>
                    <TextField
                        disabled
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        error={Boolean(getFieldError('image'))}
                        helperText={getFieldError('image')}
                        required
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={activateInput}
                        color='success'
                    >
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FileInput;