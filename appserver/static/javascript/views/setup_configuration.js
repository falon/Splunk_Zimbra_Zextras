import * as SplunkHelpers from './splunk_helpers.js'

// all_properties must be a dict with
//  email,
// passed from app.js to setup_page.js

async function create_custom_configuration_file(
  splunk_js_sdk_service,
  all_properties
) {
  var custom_configuration_file_name = "savedsearches";
  var stanza_name = "FATAL Zimbra Mailbox Errors";
  var properties_to_update = {
	  'action.email.to': all_properties.email,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

  var stanza_name = "Anomal outbound flow";
  var properties_to_update = {
          'action.email.to': all_properties.email,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

  var custom_configuration_file_name = "indexes";
  var stanza_name = "summary_email_1h";
  var properties_to_update = {
          'coldPath': all_properties.index_coldPath,
	  'enableDataIntegrityControl': all_properties.index_enableDataIntegrityControl,
	  'enableTsidxReduction': all_properties.index_enableTsidxReduction,
	  'homePath': all_properties.index_homePath,
	  'maxTotalDataSizeMB': all_properties.index_maxTotalDataSizeMB,
	  'thawedPath': all_properties.index_thawedPath
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

};

async function complete_setup(splunk_js_sdk_service) {
  var configuration_file_name = "app";
  var stanza_name = "install";
  var properties_to_update = {
      is_configured: "true",
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      configuration_file_name,
      stanza_name,
      properties_to_update,
  );
};

async function reload_splunk_app(
  splunk_js_sdk_service,
  app_name,
) {
  var splunk_js_sdk_apps = splunk_js_sdk_service.apps();
  await splunk_js_sdk_apps.fetch();

  var current_app = splunk_js_sdk_apps.item(app_name);
  current_app.reload();
};

function redirect_to_splunk_app_homepage(
  app_name,
) {
  var redirect_url = "/app/" + app_name;

  window.location.href = redirect_url;
};


function create_splunk_js_sdk_service(
  splunk_js_sdk,
  application_name_space,
) {
  var http = new splunk_js_sdk.SplunkWebHttp();

  var splunk_js_sdk_service = new splunk_js_sdk.Service(
      http,
      application_name_space,
  );

  return splunk_js_sdk_service;
};

export {
  create_custom_configuration_file,
  complete_setup,
  reload_splunk_app,
  redirect_to_splunk_app_homepage,
  create_splunk_js_sdk_service,
}
