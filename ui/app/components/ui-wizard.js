import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['ui-wizard-container'],
  wizard: inject.service(),
  auth: inject.service(),

  shouldRender: computed('wizard.showWhenUnauthenticated', 'auth.currentToken', function() {
    return this.get('auth.currentToken') || this.get('wizard.showWhenUnauthenticated');
  }),
  currentState: computed.alias('wizard.currentState'),
  featureState: computed.alias('wizard.featureState'),
  featureComponent: computed.alias('wizard.featureComponent'),
  tutorialComponent: computed.alias('wizard.tutorialComponent'),
  componentState: computed.alias('wizard.componentState'),
  nextFeature: computed.alias('wizard.nextFeature'),
  nextStep: computed.alias('wizard.nextStep'),

  actions: {
    dismissWizard() {
      this.get('wizard').transitionTutorialMachine(this.get('currentState'), 'DISMISS');
    },

    advanceWizard() {
      debugger;
      let event = this.get('wizard.initEvent') || 'CONTINUE';
      this.get('wizard').transitionTutorialMachine(this.get('currentState'), event);
    },

    advanceFeature() {
      this.get('wizard').transitionFeatureMachine(this.get('featureState'), 'CONTINUE');
    },

    repeatStep() {
      this.get('wizard').transitionFeatureMachine(
        this.get('featureState'),
        'REPEAT',
        this.get('componentState')
      );
    },

    resetFeature() {
      this.get('wizard').transitionFeatureMachine(
        this.get('featureState'),
        'RESET',
        this.get('componentState')
      );
    },

    pauseWizard() {
      this.get('wizard').transitionTutorialMachine(this.get('currentState'), 'PAUSE');
    },
  },
});
