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