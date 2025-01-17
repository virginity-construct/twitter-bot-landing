import React from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';

function Dashboard() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Sample data - replace with API calls
  const stats = {
    followers: { current: 1234, growth: 5.2 },
    engagement: { current: '4.8%', growth: 0.8 },
    tweets: { current: 28, growth: -2.1 },
    impressions: { current: '12.4K', growth: 15.3 }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Followers',
        data: [1000, 1050, 1100, 1150, 1200, 1234],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
        <StatCard
          label="Followers"
          value={stats.followers.current}
          growth={stats.followers.growth}
        />
        <StatCard
          label="Engagement Rate"
          value={stats.engagement.current}
          growth={stats.engagement.growth}
        />
        <StatCard
          label="Tweets This Month"
          value={stats.tweets.current}
          growth={stats.tweets.growth}
        />
        <StatCard
          label="Impressions"
          value={stats.impressions.current}
          growth={stats.impressions.growth}
        />
      </SimpleGrid>

      {/* Charts */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={4}>
        <Card bg={bgColor} borderColor={borderColor} borderWidth={1}>
          <CardHeader>
            <Heading size="md">Growth Trends</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </CardBody>
        </Card>

        <Card bg={bgColor} borderColor={borderColor} borderWidth={1}>
          <CardHeader>
            <Heading size="md">Recent Activity</Heading>
          </CardHeader>
          <CardBody>
            <ActivityFeed />
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}

function StatCard({ label, value, growth }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card bg={bgColor} borderColor={borderColor} borderWidth={1}>
      <CardBody>
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{value}</StatNumber>
          <StatHelpText>
            <StatArrow type={growth > 0 ? 'increase' : 'decrease'} />
            {Math.abs(growth)}%
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
}

function ActivityFeed() {
  const activities = [
    { type: 'Tweet', message: 'AI-generated tweet posted', time: '5m ago' },
    { type: 'DM', message: 'Automated response sent', time: '15m ago' },
    { type: 'Analytics', message: 'Weekly report generated', time: '1h ago' },
    { type: 'Growth', message: 'Gained 5 new followers', time: '2h ago' },
  ];

  return (
    <Box>
      {activities.map((activity, index) => (
        <Box
          key={index}
          p={3}
          borderBottomWidth={index !== activities.length - 1 ? 1 : 0}
        >
          <Text fontWeight="bold">{activity.type}</Text>
          <Text fontSize="sm">{activity.message}</Text>
          <Text fontSize="xs" color="gray.500">{activity.time}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default Dashboard;
