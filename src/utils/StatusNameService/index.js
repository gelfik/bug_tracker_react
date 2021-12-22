export const getStatusValid = (status_type) => {
    switch (status_type) {
        case 'valid':
            return 'Valid'
        case 'valid_bag':
            return 'Valid'
        case 'invalid_bag':
            return 'InValid'
        case 'invalid':
            return 'InValid'
        default:
            return ''
    }
}


export const getStatusType = (status_type) => {
    switch (status_type) {
        case 'valid':
            return 'Прошел проверку'
        case 'valid_bag':
            return 'Найдены баги и исправлены, проверка пройдена'
        case 'invalid_bag':
            return 'Найдены баги, проверка не пройдена'
        case 'invalid':
            return 'Проверка не пройдена'
        default:
            return ''
    }
}

export const getProblemType = (problem_type) => {
    switch (problem_type) {
        case 'error_in_text':
            return 'Ошибка в тексте'
        case 'cosmetic':
            return 'Косметическое несоответсвие'
        case 'performance':
            return 'Производительность'
        case 'data_lose':
            return 'Потеря данных'
        case 'functionality':
            return 'Неработающая функциональность'
        case 'freeze':
            return 'Зависание приложения'
        case 'app_crash':
            return 'Падеине приложения'
        default:
            return ''
    }
}

export const getPriorityType = (priority_type) => {
    switch (priority_type) {
        case 'short':
            return 'Низкий'
        case 'average':
            return 'Средний'
        case 'high':
            return 'Высокий'
        case 'critical':
            return 'Критический'
        case 'vulnerability':
            return 'Уязвимость'
        default:
            return ''
    }
}