  components = {
    zanPopup1: zanPopup,
    zanPopup2: zanPopup,
    zanPopup3: zanPopup,
    zanPopup4: zanPopup,
    zanPopup5: zanPopup
  }
  data = {}
  methods = {
    togglePopup() {
      this.$invoke('zanPopup1', 'togglePopup')
    },

    toggleLeftPopup() {
      this.$invoke('zanPopup2', 'togglePopup')
    },

    toggleRightPopup() {
      this.$invoke('zanPopup3', 'togglePopup')
    },

    toggleTopPopup() {
      this.$invoke('zanPopup4', 'togglePopup')
    },

    toggleBottomPopup() {
      this.$invoke('zanPopup5', 'togglePopup')
    }
  }
