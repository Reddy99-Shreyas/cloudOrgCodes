public class demoClass {
    public static List<String> getSkillsSet(Id technologyId) {
        List<String> skills = new List<String>();
        // Assuming SkillsSet is a comma-separated string field on Technology__c object
        Technology__c tech = [SELECT Id, Skill_set__c FROM Technology__c WHERE Id = :technologyId LIMIT 1];
        if(tech != null && !String.isBlank(tech.Skill_set__c)) {
            skills = tech.Skill_set__c.split(',');
            system.debug(skills);
        }
        return skills;  
    }
}