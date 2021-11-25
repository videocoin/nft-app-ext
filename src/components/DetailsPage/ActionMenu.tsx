import { ReactComponent as CloseIcon } from 'icons/closeCircle.svg';
import { ReactComponent as CloseIconFilled } from 'icons/closeCircleFilled.svg';
import { ReactComponent as MenuIcon } from 'icons/menu.svg';

import {
  Divider,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';

const ActionMenu = () => (
  <div>
    <Popover>
      <PopoverTrigger>
        <IconButton
          variant="outline"
          boxSize="80px"
          aria-label="menu"
          icon={<MenuIcon />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex py={4} align="center">
              <CloseIcon />
              <Text ml={3} fontWeight="bold" color="gray.500">
                Cancel the auction
              </Text>
            </Flex>
            <Divider />
            <Flex py={4} align="center">
              <CloseIconFilled />
              <Text ml={3} fontWeight="bold" color="pink.500">
                Burn the token
              </Text>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  </div>
);

export default ActionMenu;
