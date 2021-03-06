const get = require('lodash/get');

const transformRawDeviceData = (rawDeviceData) => {
  const device = {
    id: get(rawDeviceData, '9003'),
    name: get(rawDeviceData, '9001'),
    type: get(rawDeviceData, '3.1'),
    last_seen: get(rawDeviceData, '9020'),
    reachable: get(rawDeviceData, '9019'),
  };

  device.on = !!get(rawDeviceData, '3311.[0].5850', 0);
  device.color = get(rawDeviceData, '3311.[0].5706');
  device.brightness = get(rawDeviceData, '3311.[0].5851');

  return device;
};

const transformRawGroupData = (rawGroupData) => {
  const group = {
    id: get(rawGroupData, '9003'),
    name: get(rawGroupData, '9001'),
    devices: get(rawGroupData, '9018.15002.9003'),
  };

  group.on = !!get(rawGroupData, '5850', 0);
  group.brightness = get(rawGroupData, '5851');

  return group;
};

const transformIdentityData = (rawIdentityData) => {
  const id = {
    preshared_key: get(rawIdentityData, '9091')
  };
  return id;
}

module.exports = {
  transformRawDeviceData,
  transformRawGroupData,
  transformIdentityData
};
