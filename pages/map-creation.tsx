import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '@/components/Header';
import InputMap from '@/components/InputMap';
import InputMapType from '@/components/InputMapType';
import InputTitleTags from '@/components/InputTitleTags';
import MapCreateLoading from '@/components/MapCreateLoading';
import { useRouter } from 'next/navigation';

const steps = ['Upload/Choose preset', 'Map type', 'Description'];

export default function MapCreation() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const router = useRouter();
    const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
    const [selectedMapType, setSelectedMapType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const handleFileSelect = (file: File | null) => {
        setUploadedFile(file);
    };

    const handleSelectedMapType = (mapType: string) => {
        setSelectedMapType(mapType);
    };
    const handleTitleTagsChange = (title: string, tags: string) => {
        setTitle(title);
        setTags(tags);
    }

    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if(activeStep === steps.length - 1) {
            setTimeout(() => {
                router.push("/map-editing");
            }, 1000);
        }
    };

    const handleBack = () => {
        const newActiveStep = activeStep - 1;

    
    if (newActiveStep === 0) {
        // If going back to Step 0, reset the uploaded file
        setUploadedFile(null);
    } else if (newActiveStep === 1) {
        // If going back to Step 1, reset the selected map type
        setSelectedMapType('');
    } else if (newActiveStep === 2) {
        // If going back to Step 2, reset title and tags
        setTitle('');
        setTags('');
    }
        setActiveStep(newActiveStep);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    const isStepOneCompleted = () => {
        return uploadedFile !== null;
    };
    
    const isStepTwoCompleted = () => {
        return selectedMapType !== '';
    };
    
    const isStepThreeCompleted = () => {
        return title !== '' && tags !== '';
    };
    
    return (
        <div>
            <Header />
            <Box sx={{ padding: '24px' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <MapCreateLoading
                    uploadedFile={uploadedFile}
                    mapType={selectedMapType}
                    ontitle={title}
                    ontags={tags}
                />
                ) : (
                    <React.Fragment>
                        <div>
                            {(() => {
                                switch(activeStep) {
                                    case 0:
                                        return  <InputMap onFileSelect={handleFileSelect} />  ;
                                    case 1:                                     
                                        return <InputMapType onMapTypeSelect={handleSelectedMapType} /> ;
                                    case 2:
                                        console.log(typeof selectedMapType)
                                        return <InputTitleTags onTitleTagsChange={handleTitleTagsChange} />;
                                }
                            })()}
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext}
                                 disabled={(activeStep === 0 && !isStepOneCompleted()) ||
                                 (activeStep === 1 && !isStepTwoCompleted()) || 
                                 (activeStep === 2 && !isStepThreeCompleted()) }
                                 >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}