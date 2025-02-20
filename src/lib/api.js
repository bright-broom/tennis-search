/**
 * APIクライアントの設定を取得
 * @returns {{baseUrl: string, headers: Object}}
 */
function getApiConfig() {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.NEXT_PUBLIC_API_URL || 'localhost:3000';
  
  return {
    baseUrl: `${protocol}://${host}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

/**
 * ローカルストレージからサークル一覧を取得
 * @returns {Array<import('../types').Club>}
 */
function getLocalClubs() {
  if (typeof window === 'undefined') return [];
  const clubs = localStorage.getItem('tennis-circles');
  return clubs ? JSON.parse(clubs) : [];
}

/**
 * ローカルストレージにサークル一覧を保存
 * @param {Array<import('../types').Club>} clubs
 */
function saveLocalClubs(clubs) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tennis-circles', JSON.stringify(clubs));
}

/**
 * サークル一覧を取得
 * @returns {Promise<Array<import('../types').Club>>}
 */
export async function fetchClubs() {
  try {
    const localClubs = getLocalClubs();
    if (localClubs.length > 0) {
      return localClubs;
    }

    const { baseUrl, headers } = getApiConfig();
    const response = await fetch(`${baseUrl}/api/clubs`, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    const clubs = await response.json();
    saveLocalClubs(clubs);
    return clubs;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return getLocalClubs();
  }
}

/**
 * サークルを登録
 * @param {import('../types').Club} clubData
 * @returns {Promise<import('../types').Club>}
 */
export async function createClub(clubData) {
  try {
    const { baseUrl, headers } = getApiConfig();
    const newClub = {
      ...clubData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    // ローカルストレージに保存
    const clubs = getLocalClubs();
    clubs.push(newClub);
    saveLocalClubs(clubs);

    // APIにも送信（オプション）
    try {
      await fetch(`${baseUrl}/api/clubs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newClub),
      });
    } catch (error) {
      console.warn('APIへの保存に失敗しましたが、ローカルには保存されています:', error);
    }

    return newClub;
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
}

/**
 * サークル詳細を取得
 * @param {number} id
 * @returns {Promise<import('../types').Club | null>}
 */
export async function fetchClubById(id) {
  try {
    const clubs = getLocalClubs();
    return clubs.find(club => club.id === Number(id)) || null;
  } catch (error) {
    console.error('Error fetching club:', error);
    return null;
  }
}

/**
 * サークルに参加申請
 * @param {number} clubId
 * @param {import('../types').JoinRequest} requestData
 * @returns {Promise<boolean>}
 */
export async function joinClub(clubId, requestData) {
  try {
    const clubs = getLocalClubs();
    const clubIndex = clubs.findIndex(club => club.id === Number(clubId));
    
    if (clubIndex === -1) return false;
    
    // 参加申請を保存
    if (!clubs[clubIndex].joinRequests) {
      clubs[clubIndex].joinRequests = [];
    }
    
    clubs[clubIndex].joinRequests.push({
      ...requestData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    
    saveLocalClubs(clubs);
    return true;
  } catch (error) {
    console.error('Error joining club:', error);
    return false;
  }
}

/**
 * 画像をアップロード
 * @param {File} file
 * @returns {Promise<{url: string}>}
 */
export async function uploadImage(file) {
  const { baseUrl } = getApiConfig();
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
} 