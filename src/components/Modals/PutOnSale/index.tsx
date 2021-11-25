import ChooseType from 'components/Modals/PutOnSale/ChooseType';
import Finish from 'components/Modals/PutOnSale/Finish';
import InstantSale from 'components/Modals/PutOnSale/InstantSale';
import PutOnSale from 'components/Modals/PutOnSale/PutOnSale';
import { Step } from 'components/Modals/PutOnSale/share';
import React, { ReactNode, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import {
  Button,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
} from '@chakra-ui/react';

const Sale = () => {
  const { modals, closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('putOnSale');
  const asset = useRef<Asset>(modals.get('putOnSale')?.asset as Asset);

  const [step, setStep] = useState(Step.choose);
  const methods = useForm({
    defaultValues: {
      type: Step.putOnSale,
    },
  });
  const stepModal = useRef<Record<Step, ReactNode>>({
    [Step.choose]: <ChooseType setStep={setStep} />,
    [Step.putOnSale]: <PutOnSale setStep={setStep} asset={asset.current} />,
    [Step.instantSale]: <InstantSale setStep={setStep} asset={asset.current} />,
    [Step.finish]: <Finish asset={asset.current} />,
  });

  return (
    <form>
      <ModalContent>
        <ModalCloseButton />
        <FormProvider {...methods}>
          {stepModal.current[step]}
          <ModalFooter>
            {step !== Step.finish && (
              <Button size="md" isFullWidth onClick={onClose} variant="outline">
                Cancel
              </Button>
            )}
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </form>
  );
};

export default Sale;
