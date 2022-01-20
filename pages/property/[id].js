import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import millify from 'millify';
import dynamic from 'next/dynamic';
import { BsGridFill } from 'react-icons/bs';
import { FaBath, FaBed } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
// import ImageScrollbar from '../../components/ImageScrollbar';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
const ImageScrollbar = dynamic(
  () => import('../../components/ImageScrollbar'),
  { ssr: false }
);

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      property: data,
    },
  };
}

const PropertyIdPage = ({
  property: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  return (
    <Box maxWidth={'1000px'} margin={'auto'} p={'4'}>
      {photos && <ImageScrollbar photos={photos} />}

      <Box w="full" p="6">
        <Flex paddingTop={'2'} alignItems={'center'}>
          <Box paddingRight={'3'} color={'green.400'}>
            {isVerified && <GoVerified />}
          </Box>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            AED {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar sixe="sm" src={agency?.logo?.url} />
        </Flex>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          w="250px"
          color="blue.400"
          p="1"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
          <BsGridFill />
        </Flex>
      </Box>

      <Box marginTop={'2'}>
        <Text fontWeight={'bold'} fontSize={'lg'} marginBottom={'2'}>
          {title}
        </Text>
        <Text lineHeight={'2'} color="gray.600">
          {description}
        </Text>

        <Flex
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          textTransform={'uppercase'}
        >
          <Flex
            justifyContent={'space-between'}
            w="400px"
            borderBottom={'1px'}
            borderColor={'gray.100'}
            p="3"
          >
            <Text>Type</Text>
            <Text fontWeight={'bold'}>{type}</Text>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            w="400px"
            borderBottom={'1px'}
            borderColor={'gray.100'}
            p="3"
          >
            <Text>Purpose</Text>
            <Text fontWeight={'bold'}>{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent={'space-between'}
              w="400px"
              borderBottom={'1px'}
              borderColor={'gray.100'}
              p="3"
            >
              <Text>Furnashing Status</Text>
              <Text fontWeight={'bold'}>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>

        <Box>
          {amenities.length && (
            <Text fontSize={'2xl'} fontWeight={'black'} marginTop={'5'}>
              Facilities:
            </Text>
          )}
          <Flex flexWrap={'wrap'}>
            {amenities?.map((items) =>
              items?.amenities?.map((item) => (
                <Text
                  key={item.text}
                  fontWeight={'bold'}
                  color="blue.400"
                  fontSize={'l'}
                  p="2"
                  bg="gray.200"
                  m="1"
                  borderRadius={'5'}
                >
                  {item.text}
                </Text>
              ))
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyIdPage;
