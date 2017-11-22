/* eslint-disable */
function checkID(ID) {
  if (typeof ID !== 'string') return false;
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
  var d = new Date(birthday);
  if (d.getFullYear() < 1900) return false;
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0,
    i,
    residue;
  if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
  if (city[ID.substr(0, 2)] === undefined) return false;
  if (time >= currentTime || birthday !== newBirthday) return false;
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return false;

  return true;
}

export const validmethods = {
  // '', undefined, null, NaN, 0, false
  /**
     * 验证是否为空
     * @param  {[type]}  val    待验证的值
     * @param  {[type]}  errMsg 错误信息
     * @return {Boolean}        [description]
     */
  isEmpty: function(val, errMsg) {
    if (typeof val === 'string') val = val.trim();
    if (
      typeof val === 'undefined' ||
      val === null ||
      val === '' ||
      parseInt(val) === 0 ||
      val !== val
    ) {
      return errMsg;
    }
  },

  isIegalPwd(val, errMsg) {
    if (typeof val === 'string') val = val.trim();
    if (
      val.length < 6
    ) {
      return errMsg;
    }
  },

  /**
     * 获取字符串长度，中文为２，英文和数字为１
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
  getLen: function(str) {
    if (str === null) return 0;
    if (typeof str !== 'string') str = String(str);
    return str.replace(/[^\x00-\xff]/g, '01').length;
  },

  /**
     * 验证是否超过最大长度
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg 错误信息
     * @param  {[type]}  maxLength [description]
     * @return {Boolean}        [description]
     */
  isMaxLength: function() {
    var value = arguments[0],
      errMsg = arguments[1],
      maxLength = arguments[2];
    var length = maxLength >>> 0;
    var e_errMsg = this.isEmpty(value, errMsg);
    if (e_errMsg) return errMsg;
    var strLen = this.getLen(value);
    if (strLen > length) return errMsg;
  },

  /**
     * 验证是否超过最小长度
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg 错误信息
     * @param  {[type]}  maxLength [description]
     * @return {Boolean}        [description]
     */
  isMinLength: function() {
    var value = arguments[0],
      errMsg = arguments[1],
      minLength = arguments[2];
    var length = minLength;
    var e_errMsg = this.isEmpty(value, errMsg);
    if (e_errMsg) return errMsg;
    var strLen = this.getLen(value);
    if (strLen < length) return errMsg;
  },

  /**
     * 验证是否为正整数
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isNumber: function(val, errMsg) {
    // if (this.isEmpty(val, errMsg)) return errMsg;
    if (!/^[0-9]+$/.test(val)) return errMsg;
  },

  // 是否是有效的vin码
  IsEffectiveVin(vin, errMsg) {
    if (!/^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{17}$/.test(vin)) return errMsg;
  },

  /**
     * 是否是正数
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isPositiveNum: function(val, errMsg) {
    if (!(!this.isNumber(val, errMsg) && Number(val) > 0)) return errMsg;
  },

  /**
     * 是否是中文
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isChinese: function(val, errMsg) {
    if (!/^[\u4E00-\u9FA5]+$/.test(val)) return errMsg;
  },

  /**
     * 是否是和法的手机号
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalPhone: function(val, errMsg) {
    if (!/^1[0123456789]\d{9}$/.test(val)) return errMsg;
  },

  /**
     * 是否是合法的验证码（六位数字）
     * @param  {[type]}  val    [description]
     * @param  {[type]}  errMsg [description]
     * @return {Boolean}        [description]
     */
  isIegalCode: function(val, errMsg) {
    if (!/^[0-9]{6}$/.test(val)) return errMsg;
  },

  /**
     * 是否是合法的身份证号
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalID: function(val, errMsg) {
    //验证号码是否合法，合法返回true，不合法返回false
    var res = checkID(val);
    if (!res) return errMsg;
  },

  /**
     * 是否是合法的电子邮箱格式
     * @param  {[type]}  val [description]
     * @return {Boolean}     [description]
     */
  isIegalEmail: function(val, errMsg) {
    //var res = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);
    var res = /^[A-Z0-9a-z._%+-]{1,64}@[A-Za-z0-9.-]{1,200}\.[A-Za-z]{2,4}$/.test(val);
    if (!res) return errMsg;
  },
  /*
     * 是否是合法的借款金额
     * @param {[mount]} {description}
     * @return {description}*/
  isIegalLendMount: function(val, errMsg) {
    if (parseInt(val) < 1000) {
      return errMsg;
    }
  },
  /*
     * 是否为合法的银行卡号,银行卡号长度为16至19位
     * @param {[cardNum]} {description}
     * @return {description}*/
  isIegalCardNum: function(num, errMsg) {
    if (num.length > 19 || num.length < 16) {
      return errMsg;
    }
  },
  /**
     * 检验地址
     * @param  {[type]} address [description]
     * @param  {[type]} errMsg  [description]
     * @return {[type]}         [description]
     */
  address: function(addressArr, errMsg) {
    if (addressArr.length < 3) {
      return errMsg;
    }
    var error = '';
    addressArr.map(function(item, index) {
      item = item ? item.areaId : '';
      if (item === '' || item === null) {
        error = errMsg;
        return errMsg;
      }
    });
    if (error === errMsg) {
      return errMsg;
    }
  }
};

/**
 * Simple Validator
 * @Usage:
 *  var validator = new Util.Validator;
    validator
        .addRule(item.title, [{rule: 'isNormalLength:50', errMsg: 'title不能为空或超过25个字符！'}])
        .addRule(item.id, [{rule: 'isnotEmpty', errMsg: 'id不能为空!'}])
    var validateResult = validator.startVal();  // true or false
 */
export default class Validator {
  constructor() {
    this.cache = [];
  }

  addRule(dom, ruleArr) {
    // var value = (dom instanceof Object) ? dom.value : dom;
    var value = dom;
    for (var i = 0, len = ruleArr.length; i < len; i++) {
      var rule = ruleArr[i].rule.split(':');
      var ruleObj = {
        value: value,
        rule: rule,
        errMsg: ruleArr[i].errMsg
      };
      this.cache.push(ruleObj);
    }
    return this;
  }

  startVal(callback) {
    var cache = this.cache;
    for (var i = 0, len = cache.length; i < len; i++) {
      var methodName = cache[i].rule[0];
      var methodParam = cache[i].rule[1];
      var param = [cache[i].value, cache[i].errMsg, methodParam];
      var errMsg = validmethods[methodName].apply(validmethods, param);
      if (errMsg) {
        callback && callback(errMsg);
        return false;
      }
    }
    return true;
  }
}
