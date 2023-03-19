/**
 * MetadataUtility of common methods used in Package Builder
 * @author Christopher Pezza
 * @since 2023
 */
public with sharing class MetadataUtility {
  /**
   * Get Session Id from ApexPage
   * @param visualforcePage VF Page for Session Id
   * @return  `String`
   */  
  public static String getSessionIdFromVFPage(PageReference visualforcePage) {
    String content = Test.IsRunningTest()
      ? 'Start_Of_Session_Id1234567890End_Of_Session_Id'
      : visualforcePage.getContent().toString();
    Integer s = content.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length();
    Integer e = content.indexOf('End_Of_Session_Id');
    return content.substring(s, e);
  }

  public static final List<String> PACKAGE_TYPES = new List<String>{ 'all', 'unmanagedOnly', 'managedOnly' };

  /**
   * Get Metadata Types for the org in a SelectOption List
   * @return  `String`
   */  
  @AuraEnabled(cacheable=true)
  public static String getMetadataTypes() {
    MetadataService.MetadataPort service = createService();
    MetadataService.DescribeMetadataResult describeResult = service.describeMetadata(Integer.valueOf(API_VERSION));
    List<String> metadataTypeNames = new List<String>();
    for (MetadataService.DescribeMetadataObject metadataObject : describeResult.metadataObjects) {
      metadataTypeNames.add(metadataObject.xmlName);
      if (metadataObject.childXmlNames != null) {
        for (String childXmlName : metadataObject.childXmlNames) {
          if (childXmlName != null) {
            metadataTypeNames.add(childXmlName);
          }
        }
      }
    }

    metadataTypeNames.sort();
    List<MetadataSelector.KeyValuePair> toReturn = new List<MetadataSelector.KeyValuePair>();
    for (String metadataTypeName : metadataTypeNames) {
      toReturn.add(new MetadataSelector.KeyValuePair(metadataTypeName, metadataTypeName));
    }

    return JSON.serialize(toReturn);
  }

  public static final List<String> METADATA_TYPES = new List<String>{};

  /**
   * get System Property based on Category and Key with a default value if not found
   * @param category Category of System Property
   * @param key Unique Key of System Property
   * @param defaultValue Value to use if not found
   * @return  `String`
   */  
  public static String getSystemProperty(String category, String key, String defaultValue) {
    List<System_Property__mdt> records = [
      SELECT Id, Value__c
      FROM System_Property__mdt
      WHERE Category__c = :category AND Key__c = :key AND Is_Active__c = TRUE
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];

    if (records.size() > 0) {
      return records[0].Value__c;
    }

    return defaultValue;
  }

  /**
   * Create Service of Metadata API for initialization
   * @return  `MetadataService.MetadataPort`
   */  
  private static MetadataService.MetadataPort createService() {
    MetadataService.MetadataPort service = new MetadataService.MetadataPort();
    service.SessionHeader = new MetadataService.SessionHeader_element();
    service.SessionHeader.sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
    return service;
  }

  private static final String SYSPROP_CATEGORY = 'PackBuild';
  private static final String SYSPROP_API_KEY = 'APIVersion';
  private static final String DEFAULT_APIVERSION = '56.0';
  public static final String API_VERSION = getSystemProperty(SYSPROP_CATEGORY, SYSPROP_API_KEY, DEFAULT_APIVERSION);
}
