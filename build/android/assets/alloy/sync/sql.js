function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function Migrator(e,t){this.db=t,this.dbname=e.adapter.db_name,this.table=e.adapter.collection_name,this.idAttribute=e.adapter.idAttribute,this.column=function(e){var t=e.split(/\s+/),i=t[0];switch(i.toLowerCase()){case"string":case"varchar":case"date":case"datetime":Ti.API.warn('"'+i+'" is not a valid sqlite field, using TEXT instead');case"text":i="TEXT";break;case"int":case"tinyint":case"smallint":case"bigint":case"boolean":Ti.API.warn('"'+i+'" is not a valid sqlite field, using INTEGER instead');case"integer":i="INTEGER";break;case"double":case"float":case"decimal":case"number":Ti.API.warn('"'+e+'" is not a valid sqlite field, using REAL instead');case"real":i="REAL";break;case"blob":i="BLOB";break;case"null":i="NULL";break;default:i="TEXT"}return t[0]=i,t.join(" ")},this.createTable=function(e){var t=[],i=!1;for(var r in e.columns)r===this.idAttribute&&(i=!0),t.push(r+" "+this.column(e.columns[r]));i||this.idAttribute!==ALLOY_ID_DEFAULT||t.push(ALLOY_ID_DEFAULT+" TEXT UNIQUE");var o="CREATE TABLE IF NOT EXISTS "+this.table+" ( "+t.join(",")+")";this.db.execute(o)},this.dropTable=function(){this.db.execute("DROP TABLE IF EXISTS "+this.table)},this.insertRow=function(e){var t=[],i=[],r=[],o=!1;for(var a in e)a===this.idAttribute&&(o=!0),t.push(a),i.push(e[a]),r.push("?");o||this.idAttribute!==ALLOY_ID_DEFAULT||(t.push(this.idAttribute),i.push(guid()),r.push("?")),this.db.execute("INSERT INTO "+this.table+" ("+t.join(",")+") VALUES ("+r.join(",")+");",i)},this.deleteRow=function(e){var t="DELETE FROM "+this.table,i=_.keys(e),r=i.length,o=[],a=[];r&&(t+=" WHERE ");for(var l=0;r>l;l++)o.push(i[l]+" = ?"),a.push(e[i[l]]);t+=o.join(" AND "),this.db.execute(t,a)}}function Sync(e,t,i){var r,o,a=t.config.adapter.collection_name,l=t.config.columns,n=t.config.adapter.db_name||ALLOY_DB_DEFAULT,s=null;switch(e){case"create":case"update":s=function(){var e={};t.id||(t.id=t.idAttribute===ALLOY_ID_DEFAULT?guid():null,e[t.idAttribute]=t.id,t.set(e,{silent:!0}));var i=[],s=[],d=[];for(var b in l)i.push(b),s.push(t.get(b)),d.push("?");if(o="REPLACE INTO "+a+" ("+i.join(",")+") VALUES ("+d.join(",")+");",r=Ti.Database.open(n),r.execute("BEGIN;"),r.execute(o,s),null===t.id){var h="SELECT last_insert_rowid();",_=r.execute(h);_&&_.isValidRow()?(t.id=_.field(0),e[t.idAttribute]=t.id,t.set(e,{silent:!0})):Ti.API.warn("Unable to get ID from database for model: "+t.toJSON()),_&&_.close()}return r.execute("COMMIT;"),r.close(),t.toJSON()}();break;case"read":i.query&&i.id&&Ti.API.warn('Both "query" and "id" options were specified for model.fetch(). "id" will be ignored.'),o="SELECT * FROM "+a,i.query?o=i.query:i.id&&(o+=" WHERE "+(t.idAttribute?t.idAttribute:ALLOY_ID_DEFAULT)+" = "+(_.isString(i.id)?'"'+i.id+'"':i.id)),r=Ti.Database.open(n);var d;d=_.isString(o)?r.execute(o):r.execute(o.statement,o.params);for(var b=0,h=[];d.isValidRow();){var I={},c=0;c=_.isFunction(d.fieldCount)?d.fieldCount():d.fieldCount,_.times(c,function(e){var t=d.fieldName(e);I[t]=d.fieldByName(t)}),h.push(I),b++,d.next()}d.close(),r.close(),t.length=b,s=1===b?h[0]:h;break;case"delete":o="DELETE FROM "+a+" WHERE "+t.idAttribute+"=?",r=Ti.Database.open(n),r.execute(o,t.id),r.close(),t.id=null,s=t.toJSON()}s?(_.isFunction(i.success)&&i.success(s),"read"!==e||i.silent||t.trigger("fetch",{fromAdapter:!0})):_.isFunction(i.error)&&i.error(s)}function GetMigrationFor(e,t){var i=null,r=Ti.Database.open(e);r.execute("CREATE TABLE IF NOT EXISTS migrations (latest TEXT, model TEXT);");var o=r.execute("SELECT latest FROM migrations where model = ?;",t);return o.isValidRow()&&(i=o.field(0)+""),o.close(),r.close(),i}function Migrate(e){var t=e.migrations||[],i={};t.length&&t[t.length-1](i);var r=e.prototype.config;r.adapter.db_name=r.adapter.db_name||ALLOY_DB_DEFAULT;var o=new Migrator(r),a="undefined"==typeof r.adapter.migration||null===r.adapter.migration?i.id:r.adapter.migration;if("undefined"==typeof a||null===a){var l=Ti.Database.open(r.adapter.db_name);return o.db=l,o.createTable(r),void l.close()}a+="";var n,s=GetMigrationFor(r.adapter.db_name,r.adapter.collection_name);if(s!==a){if(s&&s>a?(n=0,t.reverse()):n=1,db=Ti.Database.open(r.adapter.db_name),o.db=db,db.execute("BEGIN;"),t.length)for(var d=0;d<t.length;d++){var b=t[d],h={};if(b(h),n){if(h.id>a)break;if(h.id<=s)continue}else{if(h.id<=a)break;if(h.id>s)continue}var I=n?"up":"down";_.isFunction(h[I])&&h[I](o)}else o.createTable(r);db.execute("DELETE FROM migrations where model = ?",r.adapter.collection_name),db.execute("INSERT INTO migrations VALUES (?,?)",a,r.adapter.collection_name),db.execute("COMMIT;"),db.close(),o.db=null}}function installDatabase(e){var t=e.adapter.db_file,i=e.adapter.collection_name,r=/(^|.*\/)([^\/]+)\.[^\/]+$/,o=t.match(r);if(null===o)throw'Invalid sql database filename "'+t+'"';e.adapter.db_name=e.adapter.db_name||o[2];var a=e.adapter.db_name;Ti.API.debug('Installing sql database "'+t+'" with name "'+a+'"');var l,n,s=Ti.Database.install(t,a),d=s.execute('pragma table_info("'+i+'");'),b={};if(d){for(;d.isValidRow();)l=d.fieldByName("name"),n=d.fieldByName("type"),b[l]=n,l!==ALLOY_ID_DEFAULT||e.adapter.idAttribute||(e.adapter.idAttribute=ALLOY_ID_DEFAULT),d.next();d.close()}else{e.adapter.idAttribute?e.adapter.idAttribute:ALLOY_ID_DEFAULT;for(var h in e.columns)l=h,n=e.columns[h],l!==ALLOY_ID_DEFAULT||e.adapter.idAttribute?h===e.adapter.idAttribute&&(n+=" UNIQUE"):e.adapter.idAttribute=ALLOY_ID_DEFAULT,b[l]=n}if(e.columns=b,e.adapter.idAttribute){if(!_.contains(_.keys(e.columns),e.adapter.idAttribute))throw'config.adapter.idAttribute "'+e.adapter.idAttribute+'" not found in list of columns for table "'+i+'"\ncolumns: ['+_.keys(e.columns).join(",")+"]"}else{Ti.API.info('No config.adapter.idAttribute specified for table "'+i+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows');var I=[],c=[];_.each(e.columns,function(e,t){c.push(t),I.push(t+" "+e)});var T=c.join(",");s.execute("ALTER TABLE "+i+" RENAME TO "+i+"_temp;"),s.execute("CREATE TABLE "+i+"("+I.join(",")+","+ALLOY_ID_DEFAULT+" TEXT UNIQUE);"),s.execute("INSERT INTO "+i+"("+T+","+ALLOY_ID_DEFAULT+") SELECT "+T+",CAST(_ROWID_ AS TEXT) FROM "+i+"_temp;"),s.execute("DROP TABLE "+i+"_temp;"),e.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",e.adapter.idAttribute=ALLOY_ID_DEFAULT}s.close()}var _=require("alloy/underscore")._,ALLOY_DB_DEFAULT="_alloy_",ALLOY_ID_DEFAULT="alloy_id",cache={config:{},Model:{}};module.exports.beforeModelCreate=function(e,t){if(cache.config[t])return cache.config[t];if("undefined"==typeof Ti.Database)throw"No support for Titanium.Database in MobileWeb environment.";return e.adapter.db_file&&installDatabase(e),e.adapter.idAttribute||(Ti.API.info('No config.adapter.idAttribute specified for table "'+e.adapter.collection_name+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows'),e.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",e.adapter.idAttribute=ALLOY_ID_DEFAULT),cache.config[t]=e,e},module.exports.afterModelCreate=function(e,t){return cache.Model[t]?cache.Model[t]:(e=e||{},e.prototype.idAttribute=e.prototype.config.adapter.idAttribute,Migrate(e),cache.Model[t]=e,e)},module.exports.sync=Sync;