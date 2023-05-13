import { defineStore } from 'pinia'
import data from '@/mocks/data.json'
import { formatDate } from '../helpers'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: data || [],
  }),
  getters: {
    formattedData: (state) => {
      const formattedData = state.data.map((data) => {
        if (data.partner === 'HUBSPOT') {
          data.firstname = data.info.hubspotDeal.hubspot_owner_id.firstname
          data.email = data.info.hubspotDeal.hubspot_owner_id.email
          data.amount = data.info.hubspotDeal.amount
          data.probability = data.info.hubspotDeal.hs_deal_stage_probability
          data.value = data.info.hubspotDeal.dealstage.value
          data.date = formatDate(data.info.hubspotDeal.createdate)
          data.updatedDate = formatDate(data.lastUpdateTime)
        } else if (data.partner === 'SALESFORCE') {
          data.firstname = data.info.salesforceOpportunity.Owner.Name
          data.email = data.info.salesforceOpportunity.Owner.Email
          data.amount = data.info.salesforceOpportunity.Opportunity.Amount
          data.probability =
            data.info.salesforceOpportunity.Opportunity.Probability
          data.value = data.info.salesforceOpportunity.Opportunity.StageName
          data.date = formatDate(
            data.info.salesforceOpportunity.Opportunity.CreatedDate
          )
          data.updatedDate = formatDate(data.lastUpdateTime)
        }

        return data
      })
      return formattedData
    },
  },
  actions: {
    orderby(field) {
      this.formattedData.sort((a, b) => b[field] - a[field])
    },
  },
})
