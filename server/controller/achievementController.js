const { achievementsData } = require('../utils/achievementsData');

const getUserAchievements = (req, res) => {
    const allAchievements = achievementsData.map(achievement => {
        return {
            ...achievement,
        };
    });

    res.json(allAchievements);
};

const getUserOwnedAchievements = (req, res) => {
  const userId = req.user.id;

  const userAchievements = req.session.achievements && req.session.achievements[userId]
      ? req.session.achievements[userId]
      : [];

    const ownedAchievements = achievementsData.filter(achievement => 
      userAchievements.some(ownedAchievement => ownedAchievement.id === achievement.id)
    );

    
  res.json(ownedAchievements);
};


const updateAchievement = (req, res) => {
    const userId = req.user.id;
    const achievementId = req.body.achievementId;


    if (!achievementId) {
        return res.status(400).json({message: 'Achievement ID is required.'});
    }

    const achievement = achievementsData.find(a => a.id === achievementId);
    if (!achievement) {
        return res.status(404).json({message: 'Achievement not found.'});
    }

    // Session'da kullanıcıya ait başarımları al veya yeni bir obje oluştur
    req.session.achievements = req.session.achievements || {};
    req.session.achievements[userId] = req.session.achievements[userId] || [];


    // Eğer başarıma zaten sahipse, bir şey yapma
    if (req.session.achievements[userId].some(a => a.id === achievementId)) {
      return res.status(200).json({ message: "User already has this achievement.", achievement });
    }

    // Başarımı session'a ekle
    req.session.achievements[userId].push({ id: achievementId, timestamp: new Date() });

    res.status(200).json({ message: 'Achievement updated successfully.', achievement});
};

module.exports = {
    getUserAchievements,
    getUserOwnedAchievements,
    updateAchievement
};