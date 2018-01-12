import {Map} from 'immutable'

// import {SkillFacetIcon, IndustryFacetIcon, LocationFacetIcon, TitleFacetIcon, CollegeFacetIcon, DegreeFacetIcon, ListFacetIcon, PersonIcon, CompanyIcon, PencilIcon, SocialFacebookIcon, SocialGithubIcon, SocialGooglePlusIcon, SocialInstagramIcon, SocialLinkedInIcon, SocialTwitterIcon, SocialVimeoIcon, SocialEmailIcon, SocialEmailSentIcon, SocialEmailReceivedIcon, CalendarIcon} from 'components/icons/icons.jsx'

export const HOSTNAME = ""

export const KEYMAP_REFRESH = "KEYMAP_REFRESH"
export const KEYMAP_SHORTCUTS = "KEYMAP_SHORTCUTS"

export const KEYMAP_SNOOZE = "KEYMAP_SNOOZE"
export const KEYMAP_PIN = "KEYMAP_PIN"
export const KEYMAP_NOTE = "KEYMAP_NOTE"
export const KEYMAP_EMAIL = "KEYMAP_EMAIL"
export const KEYMAP_BATCH_SELECT = "KEYMAP_BATCH_SELECT"
export const KEYMAP_OPEN = "KEYMAP_OPEN"
export const KEYMAP_ASSIGN = "KEYMAP_ASSIGN"

export const KEYMAP = Map.of(
  'CARDS', Map.of(
    KEYMAP_REFRESH, 'r',
    KEYMAP_SHORTCUTS, '?',
  ),
  'HOVER_CARD', Map.of(
    KEYMAP_BATCH_SELECT, 'space',
    KEYMAP_OPEN, 'return',
    KEYMAP_ASSIGN, '@',
  ),
)