import Image from 'next/image';
import { useContext } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev, isLastItemVisible } = useContext(VisibilityContext);

  console.log({ isLastItemVisible });

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
        d={['none', 'none', 'none', 'block']}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
        d={['none', 'none', 'none', 'block']}
      />
    </Flex>
  );
};

export default function ImageScrollbar({ photos }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: 'hidden' }}
    >
      {photos.map((photo) => (
        <Box
          key={photo.id}
          width={'910px'}
          itemID={photo.id}
          overflow={'hidden'}
          p="1"
        >
          <Image
            placeholder="blur"
            alt=""
            blurDataURL={photo.url}
            src={photo.url}
            width={1000}
            height={500}
            sizes={'(max-width: 500px) 100px, (max-width: 1020px) 40px, 1000px'}
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
