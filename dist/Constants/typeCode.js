"use strict";
const typeCode = {
    USER: {
        ROLE: {
            ADMINISTRATOR: 1,
            STAFF: 0
        },
        GENDER: {
            OTHER: 0,
            MALE: 1,
            FEMALE: 2
        },
        WORKFORM: {
            OTHER: 0,
            FULLTIME: 1,
            PARTTIME: 2
        }
    },
    PROJECT: {
        /**
         * mode
         */
        MODE: {
            OTHER: 0,
            PUBLIC: 1,
            SECURITY: 2
        },
        MODE_MAPPING: {
            0: 'Khác',
            1: 'Công khai',
            2: 'Bảo mật'
        },
        /**
         * status
         */
        STATUS: {
            OTHER: 0,
            NEW: 1,
            INPROGRESS: 2,
            PENDING: 3,
            FEEDBACK: 4,
            WAITTING_REVIEW: 5,
            RESOLVED: 6,
            CLOSED: 7,
            REJECT: 8
        },
        STATUS_MAPPING: {
            0: 'Khác',
            1: 'New',
            2: 'In Progress',
            3: 'Pending',
            4: 'Feedback',
            5: 'Waiting Review',
            6: 'Resolved',
            7: 'Closed',
            8: 'Reject'
        },
        /**
         * Category
         */
        CATEGORY: {
            OTHER: 0,
            FEATURE: 1,
            BUG: 2,
            QA: 3,
            UPDATE: 4,
        },
        CATEGORY_MAPPING: {
            0: 'Khác',
            1: 'Feature',
            2: 'Bug',
            3: 'QA',
            4: 'Update'
        },
        PROJECT_STATUS: {
            OPENED: 1,
            CLOSED: 0
        },
        PROJECT_STATUS_MAPPING: {
            'Đang mở': 1,
            'Đã đóng': 0
        },
        TYPE: {
            OTHER: 0,
            OUTSOURCE: 1,
            PRODUCT: 2
        },
        TYPE_MAPPING: {
            0: 'Khác',
            1: 'Outsource',
            2: 'Product'
        }
    },
    TASK: {
        /**
         * priority
         */
        PRIORITY: {
            OTHER: 0,
            LOW: 1,
            NORMAL: 2,
            HIGH: 3,
            URGENT: 4,
        },
        PRIORITY_MAPPING: {
            0: 'Khác',
            1: 'Low',
            2: 'Normal',
            3: 'High',
            4: 'Urgent'
        },
    },
    DELETE_FLAG: {
        TRUE: 1,
        FALSE: 0
    }
};
module.exports = typeCode;
