'use strict';
module.exports = function (sequelize, DataTypes) {
    var FileUpload = sequelize.define('file_uploads', {
        uniqueId : DataTypes.STRING,
        images: DataTypes.BLOB('long'),
        jsonData: DataTypes.STRING,
        mime : DataTypes.STRING,
        size : DataTypes.STRING,
        profile_file : DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                }
            }
        });
    return FileUpload;
};
