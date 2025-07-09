import { auth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

import { MAX_FREE_VOICES } from '../constants/voices';

export const incrementAvailableCount = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const userLimit = await db.userLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userLimit) {
    await db.userLimit.update({
      where: { userId },
      data: { voiceLimit: userLimit.voiceLimit + 1 },
    });
  } else {
    await db.userLimit.create({
      data: {
        userId,
        voiceLimit: 1,
      },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const userLimit = await db.userLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userLimit) {
    await db.userLimit.update({
      where: { userId },
      data: {
        voiceLimit: userLimit.voiceLimit > 0 ? userLimit.voiceLimit - 1 : 0,
      },
    });
  } else {
    await db.userLimit.create({
      data: {
        userId,
        voiceLimit: 1,
      },
    });
  }
};

export const hasAvailableVoices = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const userLimit = await db.userLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userLimit || userLimit.voiceLimit < MAX_FREE_VOICES) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { userId } = await auth();
  if (!userId) {
    return 0;
  }

  const userLimit = await db.userLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userLimit) {
    return 0;
  }

  return userLimit.voiceLimit;
};
