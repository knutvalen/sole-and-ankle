import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLE = {
    'default': {
      price: {
        color: COLORS.gray[900],
        textDecorationLine: 'none',
      },
    },
    'on-sale': {
      flag : {
        text: 'Sale',
        backgroundColor: COLORS.primary,
      },
      price: {
        color: COLORS.gray[700],
        textDecorationLine: 'line-through',
      },
    },
    'new-release': {
      flag : {
        text: 'Just Released!',
        backgroundColor: COLORS.secondary,
      },
      price: {
        color: COLORS.gray[900],
        textDecorationLine: 'none',
      },
    },
  };

  const style = STYLE[variant];

  if (!style) {
    throw new Error(`Invalid style: ${style}`);
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {
            variant !== 'default'
              ? <Flag style={{
                '--backgroundColor': style.flag.backgroundColor
              }}>{style.flag.text}</Flag>
              : null
          }
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--color': style.price.color,
            '--textDecorationLine': style.price.textDecorationLine
          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  padding-right: 4px;
  color: var(--color);
  text-decoration-line: var(--textDecorationLine);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  padding-right: 4px;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: var(--backgroundColor);
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 1rem;
  padding: 8px;
  border-radius: 2px;
`;

export default ShoeCard;
