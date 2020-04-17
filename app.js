const $overlay = document.querySelector('modal-overlay')
Vue.component('popevent',{
  data() {
    return {
      show: false,
    }
  },
  templete:`<form class="form" @submit.prevent= "" method="post">
            <div class="">
            <label class="" for="date" >Event</label>
              <input type="text" class="" placeholder="Add the event"  >
            <label class="" for="" >Details</label>
              <input type="text" class="form-input" placeholder="Add the event details"   >
              <label class="control-label" for="date" >Time</label>
              <input type="text" class="form-input" placeholder="Add time"  >
              <label class="control-label" for="date"  >Date</label>
              <input type="number" class="form-input m-1" placeholder="DD"  min="1" max="31" >
              <input type="number" class="form-input m-1" placeholder="MM"  min="1" max="12">
              <input type="number" class="form-input m-1" placeholder="YYYY"  v- >
              <button type="submit" class="form-submit mt-5 " >Add Event</button>
            </div>
          </form>`
})

Vue.component('day', {
  props: ['day', 'month', 'year'],
  computed: {
    events: function () {
      return this.$root.events.filter(event => {
        return event.day === this.day &&
          event.month === this.month &&
          event.year === this.year
      })
    }
  },
  template: `<div class ="box">
  
        <div @click="add">{{ day }}</div>
      
 <div v-if="event">
 <div class="put">
 <button @click="resets">Update</button>
 <input v-model="title" />
 <input v-model="time"/>
 <input v-model="date"/>
 <input v-model="location"/>
            <input @keyup.enter="addEvent"</input>
 <button @click="addEvent">add</button>
 <div v-for="event in eventList">
            {{event.title}}
            {{event.time}}
            {{event.date}}
            {{event.location}}
 <button @click="deleteEvent(index)">delete</button>
 </div>
 </div>

      </div>
      </div>`,
  data() {
    return {
      event: false,
      eventList: [],
      title: "Title:",
      time: "Time:",
      date: "Date:",
      location:"Location:"
    }
  },
  methods: {
    add() {
      this.event = true
    },
    resets() {
      this.event = false
    },
    addEvent() {
      this.eventList.push({
        time: this.time,
        title: this.title,
        date: this.date,
        location: this.location,

      })
      // this.reset()
    },
    reset() {
      this.time = ""
      this.title = ""
      this.date = ""
      this.location =""
      
    },
    deleteEvent(index) {
      this.eventList.splice(index, 1)

    }
  }

})

const app = new Vue({
  el: '#app',
  data:  {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Algust', 'September',
      'Octuber',
      'November', 'December'
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    selected: {
    month: moment().month(), //January
    year: 2020
    },
    show: false,
  },

  //create an event array of object
  //each event will be an object in the event array 

  //events: [{
  //text: 'Staff Metting',
  //day: 9,
  // month: 0,
  //year: 2020,
  //time: '1:30 PM',
  //details: 'Room T308'
  // }, ]

  computed: {

    daysInMonth: function () {
      const date = new Date(this.selected.year, this.selected.month + 1, 0)
        .getDate() // last day of selected month
      return date
    },
    startDay: function () {
      const date = new Date(this.selected.year, this.selected.month, 1).getDay()
      return date
    }
  }
})
