import { union } from "lodash";
import { crm_accounts, user_groups } from "./response";

const getCRMAccounts = async () => {
    return new Promise((res) => {
        res(crm_accounts);
    })
}

const getUserGroups = async () => {
    return new Promise((res) => {
        res(user_groups);
    });
}

const getMergedCompany = (crm, userGroup) => {
    return {
        names: [crm.name, userGroup.name],
        crm_id: crm.id,
        product_id: userGroup.id,
        email: union(crm.email || [], userGroup.email || [])
    }
}

export const fetchCompanies = async () => {
    const getCRMAccountsPromise = getCRMAccounts();
    const userGroupsPromise = getUserGroups();

    const [ crmResponse, userGroupResponse ] = await Promise.all([getCRMAccountsPromise, userGroupsPromise]);
    const emailCRMMap = new Map();
    const companies = [];
    crmResponse && crmResponse.forEach(({ email = [] }, pos) => {
        email.forEach(e => {
            emailCRMMap.set(e, pos);
        })
    });

    userGroupResponse && userGroupResponse.forEach(userGroup => {
        //Using every to break the loop when required;
        userGroup && userGroup.email.every(e => {
            const pos = emailCRMMap.get(e)
            if (pos >= 0) {
                companies.push(getMergedCompany(crmResponse[pos], userGroup));
                return false;
            }

            return true;
        });
    });

    console.log(companies);
    return companies;
}
