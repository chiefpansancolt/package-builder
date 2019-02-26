public with sharing class MetadataUtility {
    public static final String API_VERSION = '45.0';

    public static String getSessionIdFromVFPage(PageReference visualforcePage){
        String content = visualforcePage.getContent().toString();
        Integer s = content.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
                e = content.indexOf('End_Of_Session_Id');
        return content.substring(s, e);
    }
}
