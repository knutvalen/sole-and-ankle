import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import SearchInput from '../SearchInput';
import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';

const SuperHeader = () => {
  return (
    <Wrapper>
      <MarketingMessage>
        Free shipping on domestic orders over $75!
      </MarketingMessage>
        <InteractionContainer>
      <SearchInput />
      <HelpLink href="/help">Help</HelpLink>
      <UnstyledButton>
        <Icon id="shopping-bag" strokeWidth={1} />
      </UnstyledButton>
        </InteractionContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${COLORS.gray[300]};
  background-color: ${COLORS.gray[900]};
  height: 2.5rem;
  padding: 0 32px;
`;

const InteractionContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const MarketingMessage = styled.span`
  color: ${COLORS.white};
  flex: 1;
`;

const HelpLink = styled.a`
  color: inherit;
  text-decoration: none;
  outline-offset: 2px;

  &:not(:focus-visible) {
    outline: none;
  }
`;

export default SuperHeader;
