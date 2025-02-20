/**
 * @typedef {Object} Club
 * @property {number} id - サークルのID
 * @property {string} name - サークル名
 * @property {string} image - サークル画像のURL
 * @property {string} description - サークルの説明
 * @property {string} location - 活動場所
 * @property {string} court - 使用コート
 * @property {string} schedule - 活動時間
 * @property {string} level - テニスレベル
 * @property {number} members - 現在の会員数
 * @property {number} maxMembers - 最大会員数
 * @property {string} fee - 会費
 * @property {string} requirements - 持ち物
 * @property {string} contact - 連絡先
 * @property {string} createdAt - 作成日時
 * @property {Array<JoinRequest>} [joinRequests] - 参加申請リスト
 */

/**
 * @typedef {Object} User
 * @property {string} name - ユーザー名
 * @property {string} email - メールアドレス
 * @property {string} avatar - アバター画像のURL
 * @property {string} level - テニスレベル
 * @property {number} playYears - テニス歴
 * @property {string} favoriteShot - 得意なショット
 * @property {string} bio - 自己紹介
 */

/**
 * @typedef {Object} JoinRequest
 * @property {number} id - 申請ID
 * @property {string} name - 申請者名
 * @property {string} email - 申請者のメールアドレス
 * @property {string} message - 申請メッセージ
 * @property {'pending' | 'approved' | 'rejected'} status - 申請ステータス
 * @property {string} createdAt - 申請日時
 */

export const TENNIS_LEVELS = {
  BEGINNER: '初級',
  BEGINNER_INTERMEDIATE: '初級〜中級',
  INTERMEDIATE: '中級',
  INTERMEDIATE_ADVANCED: '中級〜上級',
  ADVANCED: '上級'
}; 