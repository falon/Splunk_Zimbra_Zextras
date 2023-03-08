
/**
 * This is an example using pure react, with no JSX
 * If you would like to use JSX, you will need to use Babel to transpile your code
 * from JSK to JS. You will also need to use a task runner/module bundler to
 * help build your app before it can be used in the browser.
 * Some task runners/module bundlers are : gulp, grunt, webpack, and Parcel
 */

import * as Setup from "./setup_page.js";

define(["react", "splunkjs/splunk"], function(react, splunk_js_sdk){
  const e = react.createElement;

  class SetupPage extends react.Component {
    constructor(props) {
      super(props);

      this.state = {
        email: 'postmaster@example.com',
	index_coldPath: '$SPLUNK_DB/summary_email_1h/colddb',
	index_enableDataIntegrityControl: '0',
	index_enableTsidxReduction: '0',
	index_homePath: '$SPLUNK_DB/summary_email_1h/db',
	index_maxTotalDataSizeMB: '1024',
	index_thawedPath: '$SPLUNK_DB/summary_email_1h/thaweddb'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ ...this.state, [event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
      event.preventDefault();

      await Setup.perform(splunk_js_sdk, this.state)
    }

    render() {
      return e("div", null, [
        e("h2", null, "Setup Page"),
        e("div", null, [
          e("p", null, "For safety reason here you can see the default values and not the actual values currently set. Remember this, if this is not the first initial setup."),
          e("form", { onSubmit: this.handleSubmit }, [
	    e("h3", null, "Email for alerting"),
            e("label", null, [
              "Email address ",
              e("input", { type: "email", name: "email", value: this.state.email, onChange: this.handleChange })
            ]),
            e("h3", null, "Summary index configuration"),
	    e("p", null, "The index summary_email_1h will be added."),
	    e("label", null, [
              "coldPath ",
              e("input", { type: "text", name: "coldPath", value: this.state.index_coldPath, onChange: this.handleChange })
            ]),
            e("label", null, [
              "enableDataIntegrityControl ",
              e("input", { type: "text", name: "enableDataIntegrityControl", value: this.state.index_enableDataIntegrityControl, onChange: this.handleChange })
            ]),
            e("label", null, [
              "enableTsidxReduction ",
              e("input", { type: "text", name: "enableTsidxReduction", value: this.state.index_enableTsidxReduction, onChange: this.handleChange })
            ]),
            e("label", null, [
              "homePath ",
              e("input", { type: "text", name: "homePath", value: this.state.index_homePath, onChange: this.handleChange })
            ]),
            e("label", null, [
              "maxTotalDataSizeMB ",
              e("input", { type: "text", name: "maxTotalDataSizeMB", value: this.state.index_maxTotalDataSizeMB, onChange: this.handleChange })
            ]),
            e("label", null, [
              "thawedPath ",
              e("input", { type: "text", name: "thawedPath", value: this.state.index_thawedPath, onChange: this.handleChange })
            ]),
            e("input", { type: "submit", value: "Submit" })
          ])
        ])
      ]);
    }
  }

  return e(SetupPage);
});
