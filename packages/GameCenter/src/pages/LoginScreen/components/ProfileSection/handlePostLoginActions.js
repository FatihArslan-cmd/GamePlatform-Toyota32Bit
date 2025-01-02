import { fetchAndStoreGames } from '../../../../utils/api';

export const handlePostLoginActions = async (setIsLoading, navigation) => {
  try {
    setIsLoading(true);

    const startTime = Date.now();
    await fetchAndStoreGames();

    const elapsedTime = Date.now() - startTime;
    const minimumDelay = 2500;

    if (elapsedTime < minimumDelay) {
      await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsedTime));
    }

    navigation.navigate('Tabs');

    // Delay updating isLoading for a smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  } catch (error) {
    console.error('Error during post-login actions:', error);
    setIsLoading(false);
  }
};
