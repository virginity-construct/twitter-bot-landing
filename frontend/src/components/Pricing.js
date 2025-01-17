import React from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('/api/v1/payments/create-checkout-session');
      
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to start subscription process. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      textAlign="center"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Growth Plan
      </Text>
      
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        $49<Text as="span" fontSize="lg">/month</Text>
      </Text>
      
      <Text color="gray.500" mb={6}>
        Everything you need to grow on X
      </Text>
      
      <List spacing={3} mb={6} textAlign="left">
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          Unlimited AI-generated tweets
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          24/7 automated DM responses
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          Comprehensive analytics
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          Growth optimization
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          Priority support
        </ListItem>
      </List>
      
      <VStack spacing={4}>
        <Button
          colorScheme="blue"
          size="lg"
          width="full"
          onClick={handleSubscribe}
        >
          Start Growing Now
        </Button>
        
        <Text fontSize="sm" color="gray.500">
          30-day money-back guarantee
        </Text>
      </VStack>
    </Box>
  );
}

export default Pricing;
