import EM from 'constants/Errors'
import { monthStrings } from 'constants/DateTime'

const TrimString = (s) => {
  let l = 0
  let r = s.length - 1
  while (l < s.length && s[l] === ' ') l++
  while (r > l && s[r] === ' ') r -= 1
  return s.substring(l, r + 1)
}

const CompareObjects = (o1, o2) => {
  let k = ''
  for (k in o1) {
    if (o1[k] !== o2[k]) return false
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) return false
  }
  return true
}

const ItemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    if (CompareObjects(haystack[i], needle)) return true
  }
  return false
}

const SortArrayObjects = (a, b, type) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false
  }
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a[0].sortKey < b[0].sortKey) {
    return -1 * modifier
  }
  if (a[0].sortKey > b[0].sortKey) {
    return 1 * modifier
  }
  return 0
}

const SortPrimitives = (a, b, type) => {
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a < b) {
    return -1 * modifier
  }
  if (a > b) {
    return 1 * modifier
  }
  return 0
}

const SortByDate = (a, b, type) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }

  const newA = new Date(a)
  const newB = new Date(b)

  if (newA < newB) {
    return -1 * modifier
  }
  if (newA > newB) {
    return 1 * modifier
  }
  return 0
}

const ExpandAllByKey = (dataArray, key) => {
  const expanded = dataArray.map((i) => {
    return i[key].map((j) => ({ ...i, [key]: j }))
  })
  return expanded.flat()
}

const getSearchStr = (Obj) => {
  if (Array.isArray(Obj)) {
    Obj = Obj.reduce(function (str, i) {
      return str + ' ' + i.sortKey
    }, '').toLowerCase()
  } else {
    Obj = Obj.toLowerCase()
  }

  return Obj
}

const isValidData = (value) => {
  let status = true
  const valueType = typeof value
  if (value !== null && valueType === 'object') {
    if (!Object.keys(value).length) {
      status = false
    }
  } else if (value === null || value === undefined) {
    status = false
  }

  return status
}

export const IsValidObject = (dataObj) => {
  let objCnt = 0
  if (!dataObj || Array.isArray(dataObj)) {
    objCnt = 0
  } else {
    const objKeys = Object.keys(dataObj)
    const objValues = Object.values(dataObj)

    if (typeof dataObj === 'object' && objKeys.length) {
      objValues.forEach((elm) => {
        if (isValidData(elm)) {
          objCnt++
        }
      })
    } else {
      objCnt = 0
    }
  }

  return Boolean(objCnt)
}

export const IsSimilarObject = (oldObject, newObject) => {
  const xObject = ParseObject(oldObject)
  const yObject = ParseObject(newObject)
  const ObjOld = xObject?.constructor?.name
  const ObjNew = yObject?.constructor?.name
  if (ObjOld !== 'Object' || ObjNew !== 'Object') {
    return false
  }
  let count = 0
  Object.keys(xObject).forEach((key) => {
    const checkKey = Object.hasOwnProperty.call(yObject, key)
    const noSameKey = yObject[key] !== xObject[key]
    if ((!checkKey || noSameKey) && key !== 'id') {
      count++
    }
  })

  if (count > 0) {
    return false
  }
  return true
}

export const PushUniqueObjects = (dataArray, newObj) => {
  if (newObj?.constructor.name !== 'Object') {
    return {
      type: 'error',
      message: EM.VALID_OBJECT,
    }
  }

  if (dataArray?.constructor.name !== 'Array') {
    return {
      type: 'error',
      message: EM.VALID_ARRAY,
    }
  }

  const res = dataArray.map((item) => {
    return IsSimilarObject(item, newObj)
  })
  const checkIt = res.some((i) => i === true)
  if (dataArray.length && checkIt) {
    alert(EM.NO_DUPLICATES)
  } else {
    dataArray.push(newObj)
  }
  return dataArray
}

export const ParseObject = (objectData) => {
  return JSON.parse(JSON.stringify(objectData))
}

export const StringifyObject = (objectData) => {
  return JSON.stringify(objectData)
}

export const CustomSort = (objectsArray, key, type) => {
  if (!objectsArray) return false
  if (!key) key = 'sortKey'
  if (!type) type = 'asc'
  return objectsArray?.sort((a, b) => {
    const keyExists = Object.hasOwnProperty.call(a, key)
    if (!keyExists) return false
    let itemA = a[key]
    let itemB = b[key]

    if (!isNaN(itemA)) itemA = Number(itemA)
    if (!isNaN(itemB)) itemB = Number(itemB)

    if (key === 'date') {
      return SortByDate(itemA, itemB, type)
    }

    if (Array.isArray(itemA)) {
      return SortArrayObjects(itemA, itemB, type)
    }
    return SortPrimitives(itemA, itemB, type)
  })
}

export const SearchObjectsArray = (searchData, searchStr, searchBy = '') => {
  if (!searchData.length || !searchStr) return false
  const results = []
  const toSearch = TrimString(searchStr).toLowerCase() // trim it
  for (let i = 0; i < searchData.length; i++) {
    if (searchBy !== '') {
      const searchItem = getSearchStr(searchData[i][searchBy])
      if (searchItem.indexOf(toSearch) !== -1) {
        if (!ItemExists(results, searchData[i])) {
          results.push(searchData[i])
        }
      }
    } else {
      for (const key in searchData[i]) {
        const searchItem = getSearchStr(searchData[i][key])
        if (searchItem.indexOf(toSearch) !== -1) {
          if (!ItemExists(results, searchData[i])) {
            results.push(searchData[i])
          }
        }
      }
    }
  }
  return results
}

export const RemoveMultiSpaces = (str) => {
  return str.replace(/\s\s+/g, ' ')
}

export const SpaceToUnderscore = (str) => {
  const lowerStr = str.toLowerCase()
  const noSpaces = lowerStr.replace(/\s/g, '_')
  return noSpaces
}

export const UnderscoreToSpace = (str) => {
  if (!str) return false
  const withSpaces = str.replace(/_+/g, ' ')
  const capitalized = withSpaces.Capitalize()
  return capitalized
}

export const UpdateArrayByKey = (dataArray, key, item) => {
  return dataArray?.map((i) => {
    if (i[key] === item[key]) {
      return item
    }
    return i
  })
}

export const GroupByKey = (dataArray, key) => {
  const validData = Array.isArray(dataArray) && dataArray.length
  if (!validData) return false
  const expandedData = ExpandAllByKey(dataArray, key)

  const result = expandedData.reduce((r, a) => {
    r[a[key].optValue] = r[a[key].optValue] || []
    r[a[key].optValue].push(a)
    return r
  }, Object.create(null))
  return result
}

export const fetchMstrMonth = (dateRefStr, type) => {
  if (!dateRefStr) return monthStrings[0]
  let monthNum = new Date(dateRefStr).getMonth() + 1
  if (type === 'next') {
    monthNum = new Date(dateRefStr).getMonth() + 2
  } else if (type === 'previous') {
    monthNum = new Date(dateRefStr).getMonth()
  }
  if (monthNum > 12) {
    monthNum = 1
  } else if (monthNum < 1) {
    monthNum = 12
  }
  const monthObject = monthStrings.find((i) => i.id === monthNum)
  return monthObject
}

export const CustomDates = (format, dateStr) => {
  let dateObj = new Date()
  if (dateStr) {
    dateObj = new Date(dateStr)
  }
  let DateFormatted
  const fullYear = dateObj.getFullYear()
  const digitsMonth = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  const digitsDate = ('0' + dateObj.getDate()).slice(-2)
  // Hours calculations
  const hours24 = ('0' + dateObj.getHours()).slice(-2)
  const minutes = ('0' + dateObj.getMinutes()).slice(-2)
  const amPm = hours24 >= 12 ? 'PM' : 'AM'
  let hours12 = hours24 % 12
  hours12 = hours12 || 12
  const strTime = hours12 + ':' + minutes + ' ' + amPm

  // string format months
  const fullMonthStr = fetchMstrMonth(`${fullYear}-${digitsMonth}`).long

  switch (format) {
    case 'MMMM YYYY':
      DateFormatted = `${fullMonthStr} ${fullYear}`
      break

    case 'YYYY-MM':
      DateFormatted = `${fullYear}-${digitsMonth}`
      break

    case 'YYYY-MM-DD':
      DateFormatted = `${fullYear}-${digitsMonth}-${digitsDate}`
      break

    case 'YYYY-MM-DD HH:MM':
      DateFormatted = `${fullYear}-${digitsMonth}-${digitsDate} ${strTime}`
      break

    default:
      DateFormatted = `${fullYear}-${digitsMonth}-${digitsDate}`
      break
  }

  return DateFormatted
}

export const FilterByMonth = (itemsArray, filterDate) => {
  if (!itemsArray?.length) return []
  if (!filterDate) {
    filterDate = CustomDates('YYYY-MM')
  } else {
    filterDate = CustomDates('YYYY-MM', filterDate)
  }
  return itemsArray?.filter((i) => {
    return CustomDates('YYYY-MM', i.date) === filterDate
  })
}

export const FilterByDay = (itemsArray, filterDate) => {
  if (!itemsArray?.length) return []
  if (!filterDate) {
    filterDate = CustomDates('YYYY-MM-DD')
  } else {
    filterDate = CustomDates('YYYY-MM-DD', filterDate)
  }
  return itemsArray?.filter((i) => {
    return CustomDates('YYYY-MM-DD', i.date) === filterDate
  })
}

export const descSubstr = (item, max) => {
  const descStr = item.description
  if (descStr.length > max) {
    return descStr.substr(0, max) + '...'
  } else {
    return descStr
  }
}

export const toggleElementView = (classes, action = 'show') => {
  if (!Array.isArray(classes)) {
    return false
  }

  classes.forEach((className) => {
    if (action === 'hide') {
      document
        .querySelectorAll(className)
        .forEach((el) => el.classList.add('d-none'))
    } else {
      document
        .querySelectorAll(className)
        .forEach((el) => el.classList.remove('d-none'))
    }
  })
}
