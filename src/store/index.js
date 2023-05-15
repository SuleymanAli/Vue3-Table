import { defineStore } from 'pinia'
import data from '@/mocks/data.json'
import { formatDate } from '../helpers'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: data || [],
    formattedData: [],
    filteredData: [],
    filterFieldName: '',
  }),
  getters: {},
  actions: {
    orderby(field) {
      if (this.filterFieldName === field) {
        this.filteredData.reverse()
        return
      } else {
        this.filterFieldName = field
      }

      if (field === 'partner' || field === 'stage') {
        this.filteredData.sort((a, b) => {
          let fa = a[field].toLowerCase(),
            fb = b[field].toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
      } else if (field === 'probability') {
        this.filteredData.sort((a, b) => b[field] - a[field])
      }
    },
    optimizeData() {
      this.filteredData = this.formattedData = this.data.map((item) => {
        if (item.partner === 'HUBSPOT') {
          item.firstname = item.info.hubspotDeal.hubspot_owner_id.firstname
          item.email = item.info.hubspotDeal.hubspot_owner_id.email
          item.amount = item.info.hubspotDeal.amount
          item.probability = item.info.hubspotDeal.hs_deal_stage_probability
          item.stage = item.info.hubspotDeal.dealstage.value
          item.date = formatDate(item.info.hubspotDeal.createdate)
          item.updatedDate = formatDate(item.lastUpdateTime)
        } else if (item.partner === 'SALESFORCE') {
          item.firstname = item.info.salesforceOpportunity.Owner.Name
          item.email = item.info.salesforceOpportunity.Owner.Email
          item.amount = item.info.salesforceOpportunity.Opportunity.Amount
          item.probability =
            item.info.salesforceOpportunity.Opportunity.Probability
          item.stage = item.info.salesforceOpportunity.Opportunity.StageName
          item.date = formatDate(
            item.info.salesforceOpportunity.Opportunity.CreatedDate
          )
          item.updatedDate = formatDate(item.lastUpdateTime)
        }

        return item
      })
    },
    search(search) {
      this.filteredData = this.formattedData.filter((data) => {
        const filterKeys = [
          'firstname',
          'partner',
          'stage',
          'probability',
          'amount',
        ]

        return filterKeys.some((key) => {
          if (typeof data[key] === 'string') {
            return data[key].toUpperCase().includes(search.toUpperCase())
          } else {
            return data[key] === Number(search)
          }
        })
      })
    },
  },
})
